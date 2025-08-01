import genreMovies from '$lib/recommender/genre_movies.json';
import type { Rating } from '$lib/types/recommender';

type GenreMovies = Record<string, number[]>;
type GenreBuckets = Record<string, Rating[]>;

export function sortRecommendationsByGenre(recommendations: Rating[]): GenreBuckets {
  // Create a reverse lookup: movieId -> genre (singular)
  const movieToGenre: Record<number, string> = {};

  for (const [genre, movieIds] of Object.entries(genreMovies as GenreMovies)) {
    for (const id of movieIds) {
      movieToGenre[id] = genre;
    }
  }

  // Initialize the genre buckets
  const genreBuckets: GenreBuckets = {};
  for (const genre of Object.keys(genreMovies as GenreMovies)) {
    genreBuckets[genre] = [];
  }

  // Sort recommendations into genres
  for (const rec of recommendations) {
    const genre = movieToGenre[Number(rec.movieId)];
    if (!genre) continue; // Skip if movie has no genre mapping

    genreBuckets[genre].push(rec);
  }

  return genreBuckets;
}
