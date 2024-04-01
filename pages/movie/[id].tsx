import { useRouter } from 'next/router'
import React from 'react'

const MovieDetails = () => {
    const { query: { id } } = useRouter()

    return (
        <div>{id}</div>
    )
}

export default MovieDetails