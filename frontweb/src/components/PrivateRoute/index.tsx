import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';
import React from "react";

type Props = {
    children: React.ReactNode;
    path?: string;
};

const PrivateRoute = ({ children, path }:Props) => {

    return (
         <Route
             path={path}
             render={({location}) =>
                             isAuthenticated() ?
                                 //Se tiver authenticado renderizza o filho
                                 <>{children}</>
                                 :
                                 //se não joga para tela de login e depois volta para a pagina que estava tentando acessar
                                 <Redirect to={{
                                     pathname: "/admin/auth/login",
                                     state:{from:location}
                                 }}/>
             }
         />
     );
};

export default PrivateRoute;
