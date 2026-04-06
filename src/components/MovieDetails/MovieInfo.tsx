import React from 'react';
import { Movie } from '@/src/data/api';

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const hasInfo = movie.release_date || movie.popularity;

  if (!hasInfo) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {movie.release_date && (
        <div>
          <span className="text-gray-400 text-sm block mb-1">Release Date</span>
          <p className="text-white font-semibold">{releaseDate}</p>
        </div>
      )}
      {movie.popularity && (
        <div>
          <span className="text-gray-400 text-sm block mb-1">Popularity</span>
          <p className="text-white font-semibold">
            {movie.popularity.toFixed(0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
