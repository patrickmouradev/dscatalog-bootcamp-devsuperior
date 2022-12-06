import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';
import React from "react";

type Props = {
    children: React.ReactNode;
    path: string;
};

const PrivateRoute = ({ children, path }: Props) => {

    return (

        <Route path={path}>
            <Children renderiza={isAuthenticated()}/>

        </Route>
    );
};

function Children (rendereiza : boolean){

}

export default PrivateRoute;