// TMDB API Configuration
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.themoviedb.org';
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const TMDB_IMAGE_BASE_PATH =
  process.env.NEXT_PUBLIC_API_IMAGE_PATH || 'https://image.tmdb.org/t/p/w500';

// Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  status_message: string;
  status_code: number;
}

// Helper function to build image URL
export const getImageUrl = (
  path: string | null,
  size: string = 'w500'
): string => {
  if (!path) return '';
  const basePath = TMDB_IMAGE_BASE_PATH.replace('/w500', '');
  return `${basePath}/${size}${path}`;
};
