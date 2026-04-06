import React from 'react';
import { Movie } from '@/src/data/api';

interface MovieHeaderProps {
  movie: Movie;
}

const MovieHeader = ({ movie }: MovieHeaderProps) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const voteCount = movie.vote_count || 0;

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        {movie.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-sm sm:text-base">
        {releaseYear && <span className="text-gray-400">{releaseYear}</span>}
        {rating && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-semibold">{rating}</span>
            {voteCount > 0 && (
              <span className="text-gray-400">
                ({voteCount.toLocaleString()} votes)
              </span>
            )}
          </div>
        )}
        {releaseDate && <span className="text-gray-400">{releaseDate}</span>}
      </div>
    </div>
  );
};

export default MovieHeader;
