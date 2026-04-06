import React from 'react';
import Image from 'next/image';

interface MoviePosterProps {
  posterUrlLink: string | null;
  title: string;
}

import { getImageUrl } from '@/src/data/api';

const MoviePoster = ({ posterUrlLink, title }: MoviePosterProps) => {
  const posterUrl = getImageUrl(posterUrlLink, 'w500');

  return (
    <div className="flex-shrink-0 mx-auto lg:mx-0">
      <div className="relative w-48 sm:w-56 md:w-64 lg:w-80 aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <svg
              className="w-16 h-16 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePoster;
