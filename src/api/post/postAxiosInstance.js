import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_POSTS_SERVER_BASE_URL,
});

export default api;
