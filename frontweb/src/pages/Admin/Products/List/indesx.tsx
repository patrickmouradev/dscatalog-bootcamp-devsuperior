import ProductCrudCard from "../ProductCrudCard/indesx";
import {NavLink} from "react-router-dom";
import './styles.css'
import {useEffect, useState} from "react";
import {SpringPage} from "../../../../types/vendor/spring";
import {Product} from "../../../../types/product";
import {AxiosRequestConfig} from "axios";
import {requestBackend} from "../../../../util/requests";

const List = () => {
    const [pageProduct, setProductPage] = useState<SpringPage<Product>>()

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts =() => {
        const config: AxiosRequestConfig = {
            method: "GET",
            url: `/products`,
            params: {
                page: 0,
                size: 12
            },
        }
        requestBackend(config).then(
            response => {
                setProductPage(response.data);
            }
        );

    };


    return (
        <div className={"product-crud-container"}>
            <div className={"product-crud-bar-container"}>
                <NavLink to={"/admin/products/create"}>
                    <button className={"btn btn-primary text-white btn-crud-add"}>Adicionar</button>
                </NavLink>
                <div className={"base-card product-filter-container"}>Barra de Pesquisa</div>
            </div>
            <div className={"row"}>
                {
                    pageProduct?.content.map(
                        product =>(
                            <div key={product.id} className={"col-sm-6 col-md-12"}>
                                <ProductCrudCard product={product}
                                                 onDelete ={() => getProducts() }
                                />
                            </div>
                        )
                    )
                }



            </div>
        </div>
    )
}


export default List;