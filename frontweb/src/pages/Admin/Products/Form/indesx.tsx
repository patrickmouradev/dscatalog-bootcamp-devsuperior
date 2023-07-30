import './styles.css'
import {useForm} from "react-hook-form";
import {Product} from "../../../../types/product";
import {requestBackend, requestBackendLogin} from "../../../../util/requests";
import {getAuthData, saveAuthData} from "../../../../util/storage";
import {getTokenData} from "../../../../util/auth";
import {AxiosRequestConfig} from "axios";
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import * as url from "url";

type UrlParams = {
    productId: string;
}
const Form = () => {

    const {productId} = useParams<UrlParams>();

    const isEditing = productId !== 'create'


    const history = useHistory();

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Product>();

    useEffect(() => {
        if(isEditing){
            requestBackend({url: `products/${productId}`})
                .then((response) =>{
                    setValue('name', response.data.name)
                    setValue("price", response.data.price)
                    setValue("imgUrl", response.data.imgUrl)
                    setValue("categories", response.data.categories)
                    setValue("description", response.data.description)
                });
        }
    },[isEditing,productId,setValue] )

    const handleCancel =() =>{
        history.push("/admin/products")
    };

    const onSubmit = (product: Product) => {

        const config: AxiosRequestConfig = {
            method: isEditing ? "PUT" :"POST",
            url: isEditing ? `/products${productId}` : `/products`,
            data: product,
            withCredentials: true
        };
        requestBackend(config)
            .then(response => {

                history.push("/admin/products")
            })
            .catch(error => {
                console.log('ERRO', error)
            })

    };

    return (
        <div className={"product-crud-container"}>
            <div className={"base-card product-crud-form-card"}>
                <h1 className={"product-card-form-title"}>Dados do Produto</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"row product-crud-inputs-container"}>
                        <div className={"col-lg-6 product-crud-inputs-left-container" }>
                            <div className={"margin-bottom-30"}>
                                <input
                                    {...register("name", //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                                        {
                                            required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido

                                        })}
                                    type="text"
                                    className={`form-control base-input ${errors.name? 'is-invalid':''}`}//condição ternaria para aparecer a borda de invalida no input
                                    placeholder="Nome do Produto"
                                    name="name" // o name tem que ser o mesmo do typeFormdata e do register

                                />
                                <div className={"invalid-feedback d-block"}>{errors.name?.message}</div>
                            </div>
                            <div className={"margin-bottom-30"}>
                                <input
                                    {...register("price", //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                                        {
                                            required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido

                                        })}
                                    type="text"
                                    className={`form-control base-input ${errors.price? 'is-invalid':''}`}//condição ternaria para aparecer a borda de invalida no input
                                    placeholder="Preço"
                                    name="price" // o name tem que ser o mesmo do typeFormdata e do register

                                />
                                <div className={"invalid-feedback d-block"}>{errors.price?.message}</div>
                            </div>

                        </div>
                        <div className={"col-lg-6"}>
                            <textarea  rows={10}
                                       {...register("description", //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                                           {
                                               required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido

                                           })}
                                       className={`form-control base-input h-auto ${errors.price? 'is-invalid':''}`}//condição ternaria para aparecer a borda de invalida no input
                                       placeholder="Descrição"
                                       name="description" // o name tem que ser o mesmo do typeFormdata e do register

                            />
                            <div className={"invalid-feedback d-block"}>{errors.description?.message}</div>

                        </div>

                    </div>
                    <div className={"product-crud-buttons-container"}>
                        <button className={"btn btn-outline-danger product-crud-button"}
                        onClick={handleCancel}

                        > CANCELAR</button>
                        <button className={"btn btn-primary product-crud-button text-white"}> Salvar</button>


                    </div>
                </form>
            </div>

        </div>
    )
}


export default Form;