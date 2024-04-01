import React from 'react'
import { Movie } from '@/types/movies';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { InfoIcon, StarIcon } from 'lucide-react';

interface MovieCardProps extends Movie { }

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const MovieCard = (props: MovieCardProps) => {
    const {
        id,
        adult,
        backdrop_path,
        genre_ids,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        popularity,
        vote_average,
        vote_count,
        video,
    } = props;

    const isNsfw = () => {
        if (adult) {
            return (
                <div className='bg-red right-0 absolute rounded-sm'>NSFW</div>
            )
        }

        return null;
    }

    return (
        <Link
            href={`/movie/${id}`}
            className='bg-white rounded-md min-h-[300px] p-4 relative flex flex-col gap-3 cursor-pointer hover:opacity-30 transition-all opacity-100 group overflow-hidden'
        >
            <div
                className={cn(
                    'absolute',
                    'top-0 left-0 right-0 bottom-0',
                    'group-hover:top-0 group-hover:right-0 group-hover:left-0 group-hover:bottom-0',
                    '-z-10 group-hover:z-10',
                    'group-hover:h-full group-hover:w-full',
                    'opacity-0 group-hover:opacity-100',
                    'transition-all p-4 duration-500',
                )}
                style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='absolute right-4'>
                    <InfoIcon height={24} />
                </div>
                <div className='relative h-full w-full flex items-center justify-center'>
                    <div className='py-2 px-3 border-gray-300 border-2 border-solid rounded-lg'>
                        View Details
                    </div>
                </div>
            </div>
            {isNsfw()}
            <h2 className='text-[1.2rem] font-semibold text-black overflow-hidden text-ellipsis h-[60px]'>
                {title}
            </h2>
            <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${poster_path}`}
                alt={`Poster Image: ${title}`}
                width={300}
                height={300}
                className='rounded-md min-h-[300px]'
            />
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-700'>
                    {dayjs(release_date).format('DD MMM, YYYY')}
                </p>
                <div className='flex items-center'>
                    <StarIcon height={14} color='gold' />
                    <p className='text-sm text-gray-700'>
                        {vote_average.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className='relative pb-8'>
                <p className='text-sm text-gray-700 h-[100px] line-clamp-5 overflow-hidden'>
                    {overview}
                </p>
                <div className='absolute bottom-0 right-0 text-gray-950 group-hover:font-semibold'>Read more</div>
            </div>
        </Link>
    )
}

export default MovieCard