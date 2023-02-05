import jwtDecode from "jwt-decode";
import {getAuthData} from "./storage";


export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'

export type TokenData = {
    exp: number,
    user_name: string,
    authorities: Role[]
}


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
        return  roles.some( role => tokenData.authorities.includes(role)) //seria o anymatch do Spring
    }
    return false;

}