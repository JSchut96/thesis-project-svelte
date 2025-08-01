import type { GenreRecommendations } from '$lib/types/recommender';


type Layouts = {
  honeycomb: GenreRecommendations;
  grid: GenreRecommendations;
  carousel: GenreRecommendations;
};

export function splitIntoThreeLayouts(genreBuckets: GenreRecommendations): Layouts {
  const honeycomb: GenreRecommendations = {};
  const grid: GenreRecommendations = {};
  const carousel: GenreRecommendations = {};

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
