import React from 'react';
import Layout from '@/src/components/Layout/Layout';

const MovieDetailsLoading = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">
            Loading movie details...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetailsLoading;
