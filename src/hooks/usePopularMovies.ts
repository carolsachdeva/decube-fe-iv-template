import { useQuery } from '@tanstack/react-query';
import { ApiError, MovieSearchResponse } from '@/src/data/api';
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.themoviedb.org';
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const TMDB_IMAGE_BASE_PATH =
  process.env.NEXT_PUBLIC_API_IMAGE_PATH || 'https://image.tmdb.org/t/p/w500';

const getPopularMovies = async (
  page: number = 1
): Promise<MovieSearchResponse> => {
  if (!TMDB_BEARER_TOKEN) {
    throw new Error(
      'TMDB Bearer token is not configured. Please set NEXT_PUBLIC_BEARER_TOKEN in your .env file'
    );
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/3/movie/popular?page=${page}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.status_message || 'Failed to fetch popular movies');
  }

  return response.json();
};

export const usePopularMovies = (page: number = 1) => {
  return useQuery<MovieSearchResponse, Error>({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
