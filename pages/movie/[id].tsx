import MovieServices from '@/services/movies'
import dayjs from 'dayjs'
import { ChevronLeft, StarIcon, ThumbsUp, Link as LinkIcon, GlobeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'

const MovieDetails = () => {
    const router = useRouter()

    const { fetchMovieDetails } = MovieServices

    const id = useMemo(() => {
        return router.query?.id?.toString?.() ?? "";
    }, [router.query?.id]);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getMovieDetails', id],
        queryFn: () => fetchMovieDetails({ movie_id: id }),
        enabled: router.isReady
    })

    console.log(data)


    const renderGenre = () => {
        if (data && data.genres.length === 0) {
            return (
                <div
                    className='text-black text-[.7rem] border rounded-xl border-gray-300 px-5 py-1'
                >
                    No Genre
                </div>

            )
        }

        return data?.genres.map((item) => {
            return (
                <div
                    key={`chip-genre-${item.id}`}
                    className='text-black text-[.6rem] border rounded-xl border-gray-300 px-5 py-1'
                >
                    {item.name}
                </div>
            )
        })
    }

    const renderProductionCompanies = () => {
        if (data?.production_companies.length === 0) {
            return (
                <div
                    className='text-black text-[.7rem] border rounded-xl border-gray-300 px-5 py-1'
                >
                    No Production Companies
                </div>
            )
        }

        return (
            <div
                className='text-gray-700 text-[.7rem] flex flex-row gap-1'
            >
                Producer:
                {data && data.production_companies.map((item) => (
                    <div
                        key={'production-company-' + item.id}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        )
    }

    const renderProductionCountry = () => {
        if (data?.production_countries.length === 0) {
            return (
                <div
                    className='text-black text-[.7rem] border rounded-xl border-gray-300 px-5 py-1'
                >
                    No Production Companies
                </div>
            )
        }

        return (
            <div className='text-gray-700 text-[.7rem] flex flex-row gap-1'>
                {data && data.production_countries.map((item) => (
                    <div key={item.iso_3166_1}>
                        {item.name}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <section>
            <div className='mt-5 mb-3 container mx-auto flex gap-4 md:gap-1 items-start relative flex-col'>
                <div className='flex flex-row gap-1 items-center'>
                    <ChevronLeft />
                    <Link href='/'>
                        <h1 className="text-xl font-bold">Go Back</h1>
                    </Link>
                </div>
                <div className='relative md:absolute md:right-0 flex flex-row gap-3 flex-wrap'>
                    <div className='flex flex-row gap-1 items-center'>
                        <StarIcon color='gold' fill='gold' height={14} />
                        <h1 className="text-xl font-bold">Rating: {data?.popularity.toFixed(0)}</h1>
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <ThumbsUp color='gold' fill='gold' height={14} />
                        <h1 className="text-xl font-bold">{data?.vote_average.toFixed(1)}</h1>
                    </div>
                </div>
            </div>
            <div className='mt-5 container mx-auto pb-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-[1%] min-h-[500px] w-full justify-between'>
                <div className='p-5 h-full bg-white w-full rounded-md shadow-md items-center flex justify-center relative'>
                    {isLoading ? (
                        <div className='bg-gray-400 h-full w-full rounded-md' />
                    ) : (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${data?.poster_path}`}
                            alt={`Poster Image: ${data?.title}`}
                            width={300}
                            height={300}
                            layout='responsive'
                            objectFit='cover'
                            loading='lazy'
                            className='rounded-sm'
                        />
                    )}
                    <div className='absolute right-[2rem] top-10 z-10 text-white font-semibold bg-emerald-500 rounded-lg px-3'>
                        {data?.status}
                    </div>
                </div>
                <div className='md:col-span-2 p-5 basis-full h-full bg-white w-full rounded-md shadow-md min-h-[81vh] flex flex-col justify-between'>
                    <div>
                        <div className='text-black font-bold text-[2rem]'>{data?.title}</div>
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <div className='mt-3 gap-3'>
                                {isLoading ? (
                                    <div className='bg-gray-400 h-full w-full min-h-[300px] rounded-md' />
                                ) : (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${data?.backdrop_path}`}
                                        alt={`Poster Image: ${data?.title}`}
                                        width={150}
                                        height={150}
                                        layout='responsive'
                                        objectFit='cover'
                                        loading='lazy'
                                        className='rounded-md'
                                    />
                                )}
                            </div>
                            <div className='flex flex-col justify-between px-3 gap-3 mt-3'>
                                <div>
                                    {renderProductionCompanies()}
                                    {renderProductionCountry()}
                                </div>
                                <div className='flex justify-between text-black'>
                                    <Link href={data?.homepage ?? ''}>
                                        <GlobeIcon color='grey' />
                                    </Link>
                                    <div>{data?.runtime ? `${data?.runtime} min` : 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 mb-2 mt-4 flex-wrap'>
                            {renderGenre()}
                        </div>
                        <div className='text-gray-700 text-[0.7rem] mt-5 mb-2 basis-full'>
                            {data?.overview}
                        </div>
                    </div>
                    <div className='text-black flex flex-row justify-between items-end flex-wrap'>
                        <div>
                            <span className='text-gray-600 text-[0.7rem]'>Release Date: </span>
                            {dayjs(data?.release_date).format('D MMM, YYYY')}
                        </div>
                        <div>
                            <div>
                                <span className='text-gray-600 text-[0.7rem]'>Budget: </span>
                                {data?.budget ? `$${data?.budget.toLocaleString()}` : 'N/A'}
                            </div>
                            <div>
                                <span className='text-gray-600 text-[0.7rem]'>Revenue: </span>
                                {data?.revenue ? `$${data?.revenue.toLocaleString()}` : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieDetails