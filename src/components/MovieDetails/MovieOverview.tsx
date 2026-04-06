import React from 'react';

interface MovieOverviewProps {
  overview: string;
}

const MovieOverview = ({ overview }: MovieOverviewProps) => {
  if (!overview) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
        Overview
      </h2>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
        {overview}
      </p>
    </div>
  );
};

export default MovieOverview;
