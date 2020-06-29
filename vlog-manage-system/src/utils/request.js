import axios from 'axios';

const service = axios.create({
    headers: {token: ''},
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        config.headers.token = token || ''
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log('response.data.code', response.data.code)
            if (response.data.code === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                location.href = '#/login'
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
