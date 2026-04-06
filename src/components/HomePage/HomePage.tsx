import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMovieSearch } from '@/src/hooks/useMovieSearch';
import { usePopularMovies } from '@/src/hooks/usePopularMovies';
import MovieCard from '@/src/components/MovieCard/MovieCard';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleMovieClick = (movieId: number) => {
    router.push(`/moviedetails?id=${movieId}`);
  };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useMovieSearch(submittedQuery, submittedQuery.length > 0);

  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
    error: popularError,
  } = usePopularMovies();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Discover Your Next Favorite Movie
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Search through thousands of movies
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-6 pointer-events-none">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={isSearchLoading}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors duration-200"
              >
                {isSearchLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results Area */}
        <div className="max-w-7xl mx-auto">
          {submittedQuery ? (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
                Search Results for &quot;{submittedQuery}&quot;
                {searchData && (
                  <span className="text-gray-400 text-sm sm:text-base font-normal ml-2">
                    ({searchData.total_results}{' '}
                    {searchData.total_results === 1 ? 'result' : 'results'})
                  </span>
                )}
              </h3>

              {isSearchLoading && (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Searching for movies...
                  </p>
                </div>
              )}

              {isSearchError && (
                <div className="text-center py-12 sm:py-16">
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
                  <p className="text-red-400 text-sm sm:text-base mb-2">
                    Error: {searchError?.message || 'Failed to fetch movies'}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Please check your API key configuration
                  </p>
                </div>
              )}

              {searchData && !isSearchLoading && !isSearchError && (
                <>
                  {searchData.results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                      {searchData.results.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => handleMovieClick(movie.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <p className="text-gray-400 text-sm sm:text-base">
                        No movies found. Try a different search term.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">
                Popular Movies
              </h3>

              {isPopularLoading && (
                <div className="text-center py-12 sm:py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Loading popular movies...
                  </p>
                </div>
              )}

              {isPopularError && (
                <div className="text-center py-12 sm:py-16">
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
                  <p className="text-red-400 text-sm sm:text-base mb-2">
                    Error:{' '}
                    {popularError?.message || 'Failed to fetch popular movies'}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Please check your API key configuration
                  </p>
                </div>
              )}

              {popularData && !isPopularLoading && !isPopularError && (
                <>
                  {popularData.results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                      {popularData.results.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onClick={() => handleMovieClick(movie.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <p className="text-gray-400 text-sm sm:text-base">
                        No popular movies available.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
