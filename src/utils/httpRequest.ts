import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_CLIENT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default httpRequest;
