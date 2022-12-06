import {Link} from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import {useForm} from "react-hook-form";

import './styles.css';
import {getAuthData, requestBackendLogin, saveAuthData} from "../../../../util/requests";
import {useState} from "react";


const Login = () => {

    type FormData = {
        username: string;
        password: string;
    }

    const [hasError, setHasError] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit = (formData: FormData) => {
        requestBackendLogin(formData)
            .then(response => {
                setHasError(false);
                saveAuthData(response.data);
                const token = getAuthData().access_token;
                console.log('SUCESSO', response);
            })
            .catch(error => {
                setHasError(true);
                console.log('ERRO', error)
            })

    }
    return (
        <div className="base-card login-card">
            <h1>LOGIN</h1>
            {hasError &&
            (<div className="alert alert-danger" role="alert">
                Ocorreu ao tentar Efetuar o Login
            </div>)
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        {...register("username", //o register esta vindo do useForm  , o nome do campo é de acordo com o type FormData declarado
                            {
                                required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, //partener de validação de email
                                    message: 'Email Inválido' //mensagem para caso oq esta sendo digitado no input esteja errado
                                }
                            })}
                        type="text"
                        className={`form-control base-input ${errors.username? 'is-invalid':''}`}//condição ternaria para aparecer a borda de invalida no input
                        placeholder="Email"
                        name="username" // o name tem que ser o mesmo do typeFormdata e do register

                    />
                    <div className={"invalid-feedback d-block"}>{errors.username?.message}</div>
                </div>
                <div className="mb-2">
                    <input
                        {...register("password",
                            {
                                required: 'Campo Obrigatorio'
                            })}
                        type="password"
                        className={`form-control base-input ${errors.password? 'is-invalid':''}`} //condição ternaria para aparecer a borda de invalida no input
                        placeholder="Password"
                        name="password"
                    />
                    <div className={"invalid-feedback d-block"}>{errors.password?.message}</div>
                </div>
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha
                </Link>
                <div className="login-submit">
                    <ButtonIcon tituloBotao={"Fazer login"}/>
                </div>
                <div className="signup-container">
                    <span className="not-registered">Não tem Cadastro?</span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
