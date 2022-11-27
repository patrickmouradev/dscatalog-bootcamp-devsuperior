import './styles.css'
import {ReactComponent as ArrowIcon} from 'assets/images/arrow.svg';

type Props ={
tituloBotao : string;
}
const ButtonIcon = ({tituloBotao} : Props) => {
    return (

        <div className={"btn-container"}>

            <button className={"btn btn-primary"}>
                <h6>{tituloBotao}</h6>
            </button>

            <div className={"btn-icon-container"}>
                <ArrowIcon/>
            </div>
        </div>


    )
}

export default ButtonIcon;