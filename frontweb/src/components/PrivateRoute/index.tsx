import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';
import React from "react";

type Props = {
    children: React.ReactNode;
    path?: string;
};

const Outlet = ({children} : Props) => {
    return <>{children}</>
}

const PrivateRoute = ({ children, path }:Props) => {

    return (
         <Route
             path={path}
             render={() =>
                             isAuthenticated() ? <Outlet> {children}</Outlet> : <Redirect to="/admin/auth/login" />
                         }
//             render={() => {
//             if(!children || !Object.keys(children).length) return <Redirect to="/admin/auth/login"/>
//             return  isAuthenticated() ? <Outlet> {children}</Outlet> : <Redirect to="/admin/auth/login"/>
//             }
//
//             }
         />
     );
};




export default PrivateRoute;
