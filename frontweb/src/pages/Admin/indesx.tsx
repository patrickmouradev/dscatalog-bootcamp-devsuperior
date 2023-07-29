import Navbar from "./Navbar/indesx";

import "./styles.css"
import {Route, Switch} from "react-router-dom";
import Users from "./Users";
import PrivateRoute from "../../components/PrivateRoute";
import Products from "./Products/indesx";

const Admin = () => {
  return (
    <div className={"admin-container"}>
       <Navbar/>
        <div className={"admin-content"}>
            <Switch>
                <PrivateRoute path={"/admin/products"}>
                    <Products/>
                </PrivateRoute>
                <PrivateRoute path={"/admin/categories"}>
                    <h1>Categories Crud</h1>
                </PrivateRoute>
                <PrivateRoute path={"/admin/users"} roles={['ROLE_ADMIN']}>
                    <Users/>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
  );
}

export default Admin;