import {Redirect, Route} from 'react-router-dom';
import {hasAnyRoles, isAuthenticated, Role} from "../../util/auth";
import React from "react";


type Props = {
    children: React.ReactNode;
    path?: string;
    roles?: Role[];
};

const PrivateRoute = ({children, path, roles = []}: Props) => {

    return (
        <Route
            path={path}
            render={({location}) =>


                !isAuthenticated() ?
                    //Se não tiver authenticado Manda para o Login
                    <Redirect to={{
                        pathname: "/admin/auth/login",
                        state: {from: location}
                    }}/> : (
                        //ESTA AUTENTICADO MAS NÂO TEM PERMISSAO ENVIA PARA PRODUCTS
                        !hasAnyRoles(roles) ? <Redirect to="/admin/products"/> :

                        //SE TIVER AUTENTICADO E TIVER PERMISAO REINDERIZA A ROTA SOLICITADA
                            <> {children}</>
                    )
            }
        />
    );
};

export default PrivateRoute;

