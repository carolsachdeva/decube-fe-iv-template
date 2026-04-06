import { useQuery } from '@tanstack/react-query';
import { ApiError, MovieSearchResponse } from '@/src/data/api';
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.themoviedb.org';
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const TMDB_IMAGE_BASE_PATH =
  process.env.NEXT_PUBLIC_API_IMAGE_PATH || 'https://image.tmdb.org/t/p/w500';

// API Functions
const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> => {
  if (!TMDB_BEARER_TOKEN) {
    throw new Error(
      'TMDB Bearer token is not configured. Please set NEXT_PUBLIC_BEARER_TOKEN in your .env file'
    );
  }

  if (!query.trim()) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/3/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.status_message || 'Failed to fetch movies');
  }

  return response.json();
};

export const useMovieSearch = (query: string, enabled: boolean = true) => {
  return useQuery<MovieSearchResponse, Error>({
    queryKey: ['movieSearch', query],
    queryFn: () => searchMovies(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};
