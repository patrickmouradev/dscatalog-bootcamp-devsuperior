import Navbar from "./Navbar";

import "./styles.css"
import {Route, Switch} from "react-router-dom";

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
                    <h1>User Crud</h1>
                </Route>
            </Switch>
        </div>
    </div>
  );
}

export default Admin;