import './styles.css';
import 'bootstrap/js/src/collapse.js'
import {Link,NavLink} from 'react-router-dom'

import history from 'util/history';
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import {getTokenData, isAuthenticated, TokenData} from "../../util/auth";
import {removeAuthData} from "../../util/storage";


type AuthData = {
    authenticated : boolean,
    tokenData? : TokenData
}

const Navbar = () => {

    const {authContextData, setAuthContextData} =useContext(AuthContext);

    useEffect(()=>{
        if(isAuthenticated()){
            setAuthContextData({
                authenticated:true,
                tokenData: getTokenData()
            })
        }else{
            setAuthContextData({
                authenticated:false
            })
        }


    },[setAuthContextData]);

    const logoutHandleClik =( event : React.MouseEvent<HTMLAnchorElement>) => { //evento do clicke do Mouse
        event.preventDefault(); //para não percorrer no link
        removeAuthData();
        setAuthContextData({
            authenticated:false
        });
        history.replace('/')

    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className="container-fluid">
                <Link to="/" className="nav-log-text">
                    <h4>DS Catalog</h4>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#dscatalog-navbar"
                    aria-controls="dscatalog-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="dscatalog-navbar">
                    <ul className="navbar-nav offset-md-2 main-menu">
                        <li>
                            <NavLink to="/" activeClassName={"active"} exact>HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" activeClassName={"active"}> CATÁLOGO </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" activeClassName={"active"}>ADMIN</NavLink>
                        </li>
                    </ul>
                </div>
                <div className={"nav-login-logout"}>
                    {
                        authContextData.authenticated ?
                            //se AUTENTICADO
                            (  <>
                                <span className={"nav-login-logout-spam"}>{authContextData.tokenData?.user_name}</span>
                                <a href={"#logout"} onClick={logoutHandleClik}> LOGOUT</a>
                                </>
                            )
                            :
                            //se NÃO AUTENTICADO
                            (
                                <Link to={"/admin/auth"}> LOGIN</Link>
                            )
                    }

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
