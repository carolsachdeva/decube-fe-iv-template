// GetPopularMovie Url - https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
export interface GetPopularMovieParams {
    language: string;
    page: number;
    region: string;
}

export interface GetPopularMovieResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}

export interface Movie {
    id: number,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    video: boolean;
}

// Get Movie Details - https://api.themoviedb.org/3/movie/movie_id?language=en-US
export interface GetMovieDetailsParams {
    movie_id: string;
    language: string;
}

export interface Genre { 
    id: number;
    name: string;
}

export interface ProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface GetMovieDetailsResponse {
    adult: boolean,
    backdrop_path: string
    belongs_to_collection: null,
    budget: number,
    genres: Genre[],
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompanies[]
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguages[];
    status: string,
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

