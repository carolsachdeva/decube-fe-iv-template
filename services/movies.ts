import { GetMovieDetailsParams, GetMovieDetailsResponse, GetPopularMovieParams, GetPopularMovieResponse } from "@/types/movies"
import axios, { AxiosRequestConfig } from "axios"

type MassagedGetPopularMovieParams = Omit<GetPopularMovieParams, 'language' | 'region'>

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const API_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiClient(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        withCredentials: false,
        accept: 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
    },
});

const fetchPopularMovies = async (params: MassagedGetPopularMovieParams): Promise<GetPopularMovieResponse> => {
    const { page } = params;
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/3/movie/popular`,
        params: {
            page,
        }
      };
    return await apiRequest<GetPopularMovieResponse>(config);
}

const fetchMovieDetails = async (params: GetMovieDetailsParams): Promise<GetMovieDetailsResponse> => {
    const { movie_id} = params;
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/3/movie/${movie_id}`,
      };
    return await apiRequest<GetMovieDetailsResponse>(config);
}

const MovieServices = { 
    fetchMovieDetails, 
    fetchPopularMovies
}

export default MovieServices;