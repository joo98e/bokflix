import makeParams from '@fn/makeParam';
import { BASE_PATH, API_KEY } from './base';

export const getMovies = async () => {

    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
        .then(res => res.json());
}