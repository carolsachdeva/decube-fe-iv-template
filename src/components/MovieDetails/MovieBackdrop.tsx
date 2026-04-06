import React from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/src/data/api';

interface MovieBackdropProps {
  backdropUrlLink: string | null;
  title: string;
}

const MovieBackdrop = ({ backdropUrlLink, title }: MovieBackdropProps) => {
  const backdropUrl = getImageUrl(backdropUrlLink, 'w1280');

  return (
    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full overflow-hidden">
      <Image
        src={backdropUrl}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent" />
    </div>
  );
};

export default MovieBackdrop;
