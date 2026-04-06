import { useQuery } from '@tanstack/react-query';
import { ApiError, Movie } from '@/src/data/api';
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.themoviedb.org';
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const TMDB_IMAGE_BASE_PATH =
  process.env.NEXT_PUBLIC_API_IMAGE_PATH || 'https://image.tmdb.org/t/p/w500';

const getMovieDetails = async (movieId: number) => {
  if (!TMDB_BEARER_TOKEN) {
    throw new Error(
      'TMDB Bearer token is not configured. Please set NEXT_PUBLIC_BEARER_TOKEN in your .env file'
    );
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.status_message || 'Failed to fetch movie details');
  }

  return response.json();
};

export const useMovieDetails = (movieId: number | null) => {
  return useQuery<Movie, Error>({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId!),
    enabled: movieId !== null && movieId > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
