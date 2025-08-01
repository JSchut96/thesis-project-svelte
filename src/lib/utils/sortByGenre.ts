import genreMovies from '$lib/recommender/genre_movies.json';

type MovieRating = {
  movieId: number;
  rating: number;
};

type GenreMovies = Record<string, number[]>;

type GenreBuckets = Record<string, MovieRating[]>;

export function sortRecommendationsByGenre(recommendations: MovieRating[]): GenreBuckets {
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
    const genre = movieToGenre[rec.movieId];
    if (!genre) continue; // Skip if movie has no genre mapping

    genreBuckets[genre].push(rec);
  }

  return genreBuckets;
}
