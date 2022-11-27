import {ReactComponent as ArrowIcon} from "assets/images/arrow.svg";
import ProductPrice from "../../components/ProductPrice";

import './styles.css'

const ProductDetails = () => {
    return (
        <div className={"product-datails-container"}>
            <div className={"base-card product-datails-card"}>
                <div className={"goback-container"}>
                    <ArrowIcon/>
                    <h2>VOLTAR</h2>
                </div>
                <div className={"row"}>
                    <div className={"col-xl-6"}>
                        <div className={"img-container"}>
                        <img src={"https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg"} alt={ "Nome do Produto"}/>
                        </div>
                        <div className={"name-price-container"}>
                        <h1>Nome do Produto</h1>
                            <ProductPrice price={22222.26}/>
                        </div>
                    </div>
                    <div className={"col-xl-6"}>
                        <div className={"description-container"}>
                            <h2>Descricao do Produto</h2>
                            <p>TESSSFUSFUIS</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
export default ProductDetails;