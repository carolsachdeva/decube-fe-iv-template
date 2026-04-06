import React from 'react';
import Layout from '@/src/components/Layout/Layout';

interface MovieDetailsErrorProps {
  error?: Error | null;
  onBack: () => void;
}

const MovieDetailsError = ({ error, onBack }: MovieDetailsErrorProps) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            Failed to Load Movie
          </h2>
          <p className="text-red-400 text-sm sm:text-base mb-6">
            {error?.message ||
              'Unable to fetch movie details. Please try again later.'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetailsError;
