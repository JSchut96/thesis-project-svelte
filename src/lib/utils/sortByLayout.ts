type MovieRating = {
  movieId: number;
  rating: number;
};

type GenreBuckets = Record<string, MovieRating[]>;

type Layouts = {
  honeycomb: GenreBuckets;
  grid: GenreBuckets;
  carousel: GenreBuckets;
};

export function splitIntoThreeLayouts(genreBuckets: GenreBuckets): Layouts {
  const honeycomb: GenreBuckets = {};
  const grid: GenreBuckets = {};
  const carousel: GenreBuckets = {};

  for (const [genre, movies] of Object.entries(genreBuckets)) {
    honeycomb[genre] = [];
    grid[genre] = [];
    carousel[genre] = [];

    // Round-robin assignment
    movies.forEach((movie, i) => {
      const target = i % 3;
      if (target === 0) honeycomb[genre].push(movie);
      else if (target === 1) grid[genre].push(movie);
      else carousel[genre].push(movie);
    });
  }

  return { honeycomb, grid, carousel };
}
