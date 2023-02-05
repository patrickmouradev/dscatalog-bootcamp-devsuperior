import Navbar from "./Navbar";

import "./styles.css"
import {Route, Switch} from "react-router-dom";
import Users from "./User";
import PrivateRoute from "../../components/PrivateRoute";

const Admin = () => {
  return (
    <div className={"admin-container"}>
       <Navbar/>
        <div className={"admin-content"}>
            <Switch>
                <PrivateRoute path={"/admin/products"}>
                    <h1>Product Crud</h1>
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