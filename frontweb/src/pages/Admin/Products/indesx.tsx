import {Route, Switch} from "react-router-dom";
import List from "./List/indesx";
import Form from "./Form/indesx";

const Products =() =>{
    return (
        <Switch>
            <Route path={"/admin/products"} exact>
                <List/>
            </Route>/
            <Route path={"/admin/products/:productId"} >
                <Form/>
            </Route>

        </Switch>
    )
}


export  default Products;