import http from '../components/http-requests/service';
import { api } from '../env';

export const register = (user) => {
    return http.post(api + '/users/', user);
}

export const loginSrv = (user) => {
    return http.post(api + '/auth', user)
}