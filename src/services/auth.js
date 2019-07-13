import http from '../components/http-requests/service';
import { api } from '../env';
import jwtDecode from 'jwt-decode'; 
const user = localStorage['currentUser'];


export const register = (user) => {
    return http.post(api + '/users/', user);
}

export const loginSrv = (user) => {
    return http.post(api + '/auth', user)
}
export const logout = () => {
    localStorage.removeItem('currentUser');
}
export const isLogin = () => {
    let result = false;
    if(user) result = true
    return result;
}
export const getCurrentUser = () => {
    if(user) return jwtDecode(user);
    return null;
}