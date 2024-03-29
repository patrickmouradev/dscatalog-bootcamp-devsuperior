import {Link} from "react-router-dom";
import ProductCard from "../../components/ProductCard/indesx";
import {requestBackend} from "../../util/requests";
import CardLoader from "./CardLoader/indesx";
import Pagination from "../../components/Pagination/indes";
import {useEffect, useState} from "react";
import {SpringPage} from "../../types/vendor/spring";
import {Product} from "../../types/product";
import {AxiosRequestConfig} from "axios";


import "./styles.css"


const Calatog = () => {

    const [page, setPage] = useState<SpringPage<Product>>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/products`,
            params: {
                page: 0,
                size: 12
            },
        }
        setIsLoading(true)
        requestBackend(params).then(
            response => {
                setPage(response.data);
            }
        ).finally(() => {
            setIsLoading(false)
        });
    }, [])

    return (
        <div className={"container my-4 catalog-container"}>
            <div className={"row catalog-title-container"}>
                <h1>Catalogo de Produtos</h1>
            </div>
            <div className={"row"}>
                {isLoading ? <CardLoader/> : (
                    page?.content.map(product => {
                        return (
                            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                                <Link to="products/1">
                                    <ProductCard product={product}/>
                                </Link>
                            </div>
                        )
                    }))}

            </div>
            <div className={"row"}>
                <Pagination/>

            </div>
        </div>
    );
}

export default Calatog;