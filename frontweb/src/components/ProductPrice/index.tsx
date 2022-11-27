import './styles.css'
import {formatPrice} from "../../util/formatters";
type Props ={
    price: number;
}
const ProductPrice = ({price}: Props) => {
    return (
        <div className={"product-price-container"}>
            <span>R$</span>
            <h3>{formatPrice(price)}</h3>
        </div>
    );
}

export default ProductPrice;