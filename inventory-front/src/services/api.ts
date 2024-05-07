import axios from 'axios'

const baseURL = 'http://127.0.0.1:8080/api/v1/';

const api = axios.create({
    baseURL
})

export default api;