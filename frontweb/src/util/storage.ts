
const tokenKey = 'authData'

type LoginResponse =
    {
        access_token: string,
        token_type: string,
        expires_in: number,
        scope: string,
        userId: number,
        userFistName: string
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