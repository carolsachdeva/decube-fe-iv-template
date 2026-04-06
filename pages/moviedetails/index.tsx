import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/src/components/Layout/Layout';
import { useMovieDetails } from '@/src/hooks/useMovieDetails';
import { getImageUrl } from '@/src/data/api';
import MovieDetailsLoading from '@/src/components/MovieDetails/MovieDetailsLoading';
import MovieDetailsError from '@/src/components/MovieDetails/MovieDetailsError';
import MovieBackdrop from '@/src/components/MovieDetails/MovieBackdrop';
import MoviePoster from '@/src/components/MovieDetails/MoviePoster';
import MovieHeader from '@/src/components/MovieDetails/MovieHeader';
import MovieOverview from '@/src/components/MovieDetails/MovieOverview';
import MovieInfo from '@/src/components/MovieDetails/MovieInfo';
import BackButton from '@/src/components/MovieDetails/BackButton';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const movieId = id ? parseInt(id as string, 10) : null;

  const { data: movie, isLoading, isError, error } = useMovieDetails(movieId);

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout>
      {isLoading && <MovieDetailsLoading />}

      {(!isLoading && isError) || !movie ? (
        <MovieDetailsError error={error} onBack={handleBack} />
      ) : (
        <div className="relative">
          <MovieBackdrop
            backdropUrlLink={movie.backdrop_path}
            title={movie.title}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 md:-mt-48 lg:-mt-64 relative z-10 mb-[200px]">
            <BackButton onClick={handleBack} />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <MoviePoster
                posterUrlLink={movie.poster_path}
                title={movie.title}
              />

              {/* Movie Info */}
              <div className="flex-1">
                <MovieHeader movie={movie} />
                <MovieOverview overview={movie.overview} />
                <MovieInfo movie={movie} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MovieDetails;
