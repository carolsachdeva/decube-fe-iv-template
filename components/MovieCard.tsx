import React from 'react'
import { Movie } from '@/types/movies';

interface MovieCardProps extends Movie { }

const MovieCard = (props: MovieCardProps) => {
    return (
        <div>MovieCard</div>
    )
}

export default MovieCard