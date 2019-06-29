import axios from 'axios';
import logger from '../../services/logService';
axios.interceptors.response.use(null, error => {
    let ErrMsg = {status: 0, message: 'sorry an error occured'}
    if (error.response) {
        const { status , data } = error.response;
        ErrMsg = {status, message: data}
        logger.log(ErrMsg);
    }
    return Promise.reject(ErrMsg);

})

const getPosts = async (api) => {
    const res = await axios.get(api);
    return res.data;
}

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    getPosts
};