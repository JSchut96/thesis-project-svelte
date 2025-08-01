// Load Id pairs from json file
import idPairs from '$lib/recommender/movie_id_pairs.json';

// Create lookup maps
const movieIdToTmdb = new Map<number, number>();
const tmdbToMovieId = new Map<number, number>();

// Create the pairs inside lookup maps
for (const [movieId, tmdbId] of idPairs) {
  movieIdToTmdb.set(movieId, tmdbId);
  tmdbToMovieId.set(tmdbId, movieId);
}

// Helper functions to transform Id one way or the other
export function getTmdbId(movieId: number): number | undefined {
  return movieIdToTmdb.get(movieId);
}

export function getMovieId(tmdbId: number): number | undefined {
  return tmdbToMovieId.get(tmdbId);
}
