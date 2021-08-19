import axios from 'axios';
import store from '../Redux/Store';

const JwtAxios = axios.create();
JwtAxios.interceptors.request.use(request => {
    request.headers = {
        Authorization: store.getState().authState.user.token
    };

    return request;
});

export default JwtAxios;