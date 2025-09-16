import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

// Math imports
import numeric from 'numeric';
import { Matrix, pseudoInverse } from 'ml-matrix';
import rawEmbeddings from '$lib/recommender/item_embeddings.json';

// Sorting imports
import { sortRecommendationsByGenre } from '$lib/utils/sortByGenre';
import { splitIntoThreeLayouts } from '$lib/utils/sortByLayout';
import { getMovieId, getTmdbId } from '$lib/utils/idMap';

// Types
import type { EmbeddingMap } from '$lib/types/recommender';
import type { Rating, GenreRecommendations } from '$lib/types/recommender';
type MovieId = number | string;
const itemEmbeddings = rawEmbeddings as EmbeddingMap;


// Estimate a user embedding based on movies they rated and the corresponding ratings.
function inferUserEmbedding(ratedMovies: MovieId[], ratings: number[]): number[] {
  // Filter out movies with missing embeddings
  const valid = ratedMovies
    .map((id, i) => ({ embedding: itemEmbeddings[String(id)], rating: ratings[i] }))
    .filter(x => x.embedding !== undefined);

  const Q = valid.map(x => x.embedding);  
  const R = valid.map(x => x.rating);     

  const Qm = new Matrix(Q);               
  const QTQ_inv = pseudoInverse(Qm.transpose().mmul(Qm));  
  const RQ = new Matrix([R]).mmul(Qm);    
  const u = RQ.mmul(QTQ_inv);             

  return u.to1DArray();
}

// Scales a raw score (dot product) into a plausible rating range using a sigmoid
function scaledSigmoid(x: number, minRating = 0.5, maxRating = 5.0): number {
  const sig = 1 / (1 + Math.exp(-x)); // Sigmoid output in [0,1]
  return minRating + sig * (maxRating - minRating); // Scale to rating range
}

// Predict ratings for all movies given a user embedding
function predictRatings(userEmbedding: number[]): Rating[] {
  const predictions: Rating[] = [];

  for (const [movieId, itemEmbedding] of Object.entries(itemEmbeddings)) {
    // Predict rating via dot product, then scale to rating range
    const pred = scaledSigmoid(numeric.dot(userEmbedding, itemEmbedding));
    predictions.push({ movieId, rating: pred });
  }

  // Sort by predicted rating, descending
  predictions.sort((a, b) => b.rating - a.rating);

  return predictions;
}

export const POST: RequestHandler = async ({ request, locals }) => {
  // Check that the participant (user session) exists
  const participant = locals.participant;
  if (!participant) {
    throw error(400, 'Missing or invalid session');
  }

  // Extract selected genres and movies from request body
  const { genres, movies }: { genres: string[]; movies: number[] } = await request.json();
  // Translate UI-facing movie IDs to internal model IDs, filtering out undefined
  const translatedMovies: number[] = movies
    .map(getMovieId)
    .filter((id): id is number => id !== undefined);

  // Assume constant rating of 4.0 for all user-selected movies
  const ratings = Array(translatedMovies.length).fill(4.0);

  // Estimate a latent user embedding based on selected movies and fixed ratings
  const userEmbedding = inferUserEmbedding(translatedMovies, ratings);

  // Predict ratings for all known movies
  const recommendations = predictRatings(userEmbedding);

  // Sort predicted ratings into genre buckets
  const recommendationsSorted = sortRecommendationsByGenre(recommendations);

  // Transform genre buckets: convert internal movie IDs to TMDb IDs and include rating
  const transformed: GenreRecommendations = {};

  for (const genre in recommendationsSorted) {
    transformed[genre] = recommendationsSorted[genre]
      .map(({ movieId, rating }) => {
        const tmdbId = getTmdbId(Number(movieId));
        return tmdbId !== undefined ? { movieId: tmdbId, rating } : null;
      })
      .filter((entry): entry is { movieId: number; rating: number } => entry !== null);
  }

  // Further divide transformed recommendations into three layouts for the UI
  const layoutSplit = splitIntoThreeLayouts(transformed);

  // Persist user preferences and computed layout to the database
  try {
    await prisma.participant.update({
      where: { sessionId: participant.sessionId },
      data: {
        extractedGenres: genres,
        preferenceMovies: translatedMovies,
        moviePages: layoutSplit
      }
    });
  } catch (err) {
      console.error('Could not update participant:', err);
      throw error(500, 'Failed to update database. Please try again later.');
  }  

  // Respond with success
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
