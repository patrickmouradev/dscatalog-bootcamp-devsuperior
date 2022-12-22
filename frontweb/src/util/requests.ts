import qs from "qs";
import axios, {AxiosRequestConfig} from "axios";
import history from "./history";
import jwtDecode from 'jwt-decode'

type LoginResponse =
    {
        access_token: string,
        token_type: string,
        expires_in: number,
        scope: string,
        userId: number,
        userFistName: string
    }

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog'
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123'
const tokenKey = 'authData'

type LoginData = {
    username: string;
    password: string;
}
type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'

export type TokenData = {
    exp: number,
    user_name: string,
    authorities: Role[]
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

export const saveAuthData = (loginResponse: LoginResponse) => {
    localStorage.setItem(tokenKey, JSON.stringify(loginResponse));
}

export const getAuthData = () => {
    const str = localStorage.getItem(tokenKey) ?? '{}'; // ?? se for nulo ou undifenid devolve um obj precisa estar em aspas simples pois a const é do tipo string
    const loginResponse = JSON.parse(str);

    return loginResponse as LoginResponse; //para garantir a resposta seja LoginResponse
}

export const removeAuthData = () => {
    localStorage.removeItem(tokenKey);
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
    return response;
}, function (error) {
    if (error.response.status === 401 ||error.response.status === 403 ){
        history.push('/admin/auth');
    }
    return Promise.reject(error);
});

export  const  getTokenData = () : TokenData | undefined => {   //deve retornor um tipo TokenData ou undefined
    const loginResponse = getAuthData();
    try {
        return jwtDecode(loginResponse.access_token) as TokenData;
    }
    catch (error) {
        return undefined;
    }


}

//Funcao para saber se o token esta expirado / não autenticado
export const isAuthenticated =() : boolean  =>{
    const tokenData = getTokenData();
    return (tokenData && tokenData.exp *1000 > Date.now()) ? true : false;
}


//Funcao para saber se um determinado usuario tem permissao (ROLE) para acessar uma rota
export const hasAnyRoles = (roles : Role[]) : boolean =>{
    if (roles.length===0){
        return true;
    }
    const tokenData = getTokenData();
    if(tokenData !== undefined) {
        roles.forEach( role => {
            if(tokenData.authorities.includes(role)){
                return true
            }
        })

    }
    return false;

}