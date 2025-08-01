export type Rating = {
  movieId: string;
  rating: number;
};

export type GenreRecommendations = Record<string, { movieId: number; rating: number }[]>;

export type EmbeddingMap = Record<string, number[]>;
