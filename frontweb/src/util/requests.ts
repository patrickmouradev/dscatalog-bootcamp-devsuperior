import qs from "qs";
import axios, {AxiosRequestConfig} from "axios";
import history from "./history";
import {getAuthData} from "./storage";


export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog'
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123'

type LoginData = {
    username: string;
    password: string;
}

export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    }

    const data = qs.stringify({
        ...loginData,
        grant_type: 'password'
    })

    return axios({
        method: 'POST',
        baseURL: BASE_URL,
        url: '/oauth/token',
        data,
        headers
    })
}

export const requestBackend = (config: AxiosRequestConfig) => {
    const headers = config.withCredentials ? {
        ...config.headers,   // para pegar os header ja passado na chamada e acrescentar o cod abaixo
        'Authorization': 'Bearer ' + getAuthData().access_token
    } : config.headers

    return axios({...config, baseURL: BASE_URL, headers: headers}); //... spred opaator para desconstruir o obj

}


// Adicionar Interceptor antes da Request para validações
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Adicionar Interceptor na response para validações
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response)
    return response;
}, function (error) {
    console.log(error)

    if (error.response.status === 401  ){
        history.push('/admin/auth');
    }
    return Promise.reject(error);
});




