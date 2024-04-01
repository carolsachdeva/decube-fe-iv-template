import { useState } from "react";
import { useQuery } from "react-query";

import Movies from '@/services/movies';
import MovieCard from "@/components/MovieCard";

export default function Home() {

  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ['getPopularMovies', page],
    queryFn: () => Movies.fetchPopularMovies({ page }),
  })

  const results = data?.results || [];

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:gap-5 md:grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[300px] bg-gray-300 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      )
    }

    const renderData = () => {
      if (!results) return (
        <div className="flex w-full justify-center h-full bg-red items-center">
          No results. Please try again.
        </div>
      )

      return (
        <div className="grid grid-cols-1 md:gap-5 md:grid-cols-4 gap-4">
          {results.map((item) => (<MovieCard key={item.id} {...item} />))}
        </div>
      )
    }

    return renderData()
  }

  const renderPaginator = () => {
    if (data && (data.total_pages <= 1 || page === data?.total_pages) || isLoading) {
      return null
    }

    const handlePaginatorClick = () => {
      if (data && (page <= data?.total_pages)) {
        setPage(prev => prev + 1)
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    return (
      <div className="flex justify-between w-full mt-7 mb-5">
        <div>
          Showing {page} of {data?.total_pages}
        </div>
        <button
          className="bg-red text-white px-4 py-2 rounded-lg"
          type="button"
          onClick={handlePaginatorClick}
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <section className="bg-black shadow-lg">
      <div className="mx-auto container min-h-screen p-3 md:p-5">
        <h1 className="text-xl font-bold">Popular Movies</h1>
        <div className="mt-5 md:mt-8 h-full w-full">
          {renderBody()}
        </div>
        {renderPaginator()}
      </div>
    </section>
  );
}
