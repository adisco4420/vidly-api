import http from '../components/http-requests/service';

const api = 'http://localhost:3900/api';

export const allGenres = async () => {
    const res = await http.get(api + '/genres');
    return res.data;
}
export const allMovies = async () => {
    const res = await http.get(api + '/movies');
    return res.data;
}
export const deleteMovie =  (id) => {
    return http.delete(api + '/movies/' + id);
}