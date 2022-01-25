import makeParams from '@fn/makeParam';
import { BASE_PATH, API_KEY } from './base';

export const getMovies = async () => {
    // https://api.themoviedb.org/3/movie/438695/videos?api_key=7af162848d238272f0e7b0dae11c5b61&language=ko
    // https://api.themoviedb.org/3/movie/297762?api_key=7af162848d238272f0e7b0dae11c5b61&append_to_response=videos
    // https://www.youtube.com/watch?v=ywmOxCwBA4k
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`)
        .then(res => res.json());
}

export interface IMovie{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IGetMoviesResult{
    dates : {
        maximum : string;
        minimum : string;
    };
    page : number;
    results : IMovie[];
    total_pages : number;
    total_results : number;
}