import {ReactComponent as MainImage} from 'assets/images/main-image.svg';
import ButtonIcon from "../../components/ButtonIcon/indesx";
import {Link} from 'react-router-dom';

import './styles.css';

const Home = () => {
    return (
        <div className={"home-container"}>
            <div className={"base-card home-card"}>
                <div className={"home-content-container"}>
                    <div>
                        <h1>Conheça o Melhor Catálogo de Conteudos</h1>
                        <p>Ajudaremos você a encontrar os melhores produtos no mercado</p>
                    </div>
                    <div>
                        <Link to={"/products"}>
                            <ButtonIcon tituloBotao = "Inicia Agora Sua Busca " />
                        </Link>

                    </div>
                </div>
                <div className={"home-image-container"}>
                    <MainImage/>
                </div>

            </div>
        </div>

    );
}

export default Home;
