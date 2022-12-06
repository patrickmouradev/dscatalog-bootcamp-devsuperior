import Navbar from "./Navbar";

import "./styles.css"
import {Route, Switch} from "react-router-dom";
import Users from "./User";

const Admin = () => {
  return (
    <div className={"admin-container"}>
       <Navbar/>
        <div className={"admin-content"}>
            <Switch>
                <Route path={"/admin/products"}>
                    <h1>Product Crud</h1>
                </Route>
                <Route path={"/admin/categories"}>
                    <h1>Categories Crud</h1>
                </Route>
                <Route path={"/admin/users"}>
                    <Users/>
                </Route>
            </Switch>
        </div>
    </div>
  );
}

export default Admin;