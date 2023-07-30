import './styles.css'
import {Controller, useForm} from "react-hook-form";
import {Product} from "../../../../types/product";
import {requestBackend} from "../../../../util/requests";
import {AxiosRequestConfig} from "axios";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Select from "react-select"
import {Category} from "../../../../types/category";
import CurrencyInput from "react-currency-input-field";

type UrlParams = {
    productId: string;
}
const Form = () => {


    const {productId} = useParams<UrlParams>();

    const isEditing = productId !== 'create'


    const history = useHistory();

    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm<Product>();

    useEffect(() => {

        requestBackend({url: `/categories`}).then(response => {
            setSelectCategories(response.data.content)
        })

    }, [])

    useEffect(() => {
        if (isEditing) {
            requestBackend({url: `products/${productId}`})
                .then((response) => {
                    setValue('name', response.data.name)
                    setValue("price", response.data.price)
                    setValue("imgUrl", response.data.imgUrl)
                    setValue("categories", response.data.categories)
                    setValue("description", response.data.description)
                });
        }
    }, [isEditing, productId, setValue])

    const handleCancel = () => {
        history.push("/admin/products")
    };

    const onSubmit = (product: Product) => {
        const data = {...product, price: String(product.price).replace(',', '.')}; //Pegando o preco do Form, e trocando a , por ponto, pois o Back só aceita ponto
        const config: AxiosRequestConfig = {
            method: isEditing ? "PUT" : "POST",
            url: isEditing ? `/products/${productId}` : `/products`,
            data: data,
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

    const [selectCategories, setSelectCategories] = useState<Category[]>([])

    return (

        <div className="product-crud-container">
            <div className="base-card product-crud-form-card">
                <h1 className={"product-card-form-title"}>Dados do Produto</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row product-crud-inputs-container">
                        <div className="col-lg-6 product-crud-inputs-left-container">
                            <div className="margin-bottom-30">
                                <input
                                    {...register('name', { //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                                        required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}//condição ternaria para aparecer a borda de invalida no input
                                    placeholder="Nome do produto"
                                    name="name"
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.name?.message}
                                </div>
                            </div>

                            <div className="margin-bottom-30 ">
                                <Controller
                                    name="categories"
                                    rules={{required: true}}
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            options={selectCategories}
                                            classNamePrefix="product-crud-select"
                                            isMulti
                                            getOptionLabel={(category: Category) => category.name}
                                            getOptionValue={(category: Category) =>
                                                String(category.id)
                                            }
                                        />
                                    )}
                                />
                                {errors.categories && (
                                    <div className="invalid-feedback d-block">
                                        Campo obrigatório
                                    </div>
                                )}
                            </div>

                            <div className="margin-bottom-30">
                                <Controller
                                    name="price"
                                    rules={{required: 'Campo obrigatório'}}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            placeholder="Preço"
                                            className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}//condição ternaria para aparecer a borda de invalida no input
                                            disableGroupSeparators={true} //desabilitar o agregador de milhar
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            decimalsLimit={2}
                                        />
                                    )}
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.price?.message}
                                </div>
                            </div>

                            <div className="margin-bottom-30">
                                <input
                                    {...register("imgUrl", //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                                        {
                                            required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido
                                            pattern: {
                                                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm, //partener de validação de URL
                                                message: 'Deve ser uma URL Valida' //mensagem para caso oq esta sendo digitado no input esteja errado
                                            }
                                        })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}//condição ternaria para aparecer a borda de invalida no input
                                    placeholder="Url da Imagem do Produto"
                                    name="imgUrl" // o name tem que ser o mesmo do typeFormdata e do register

                                />
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl?.message}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                <textarea
                    rows={10}
                    {...register("description", //o register esta vindo do useForm  , o nome do campo é de acordo com o type Product declarado
                        {
                            required: 'Campo Obrigatorio', //mensagem no campo requerido que não está preenchido

                        })}
                    className={`form-control base-input h-auto ${
                        errors.name ? 'is-invalid' : ''
                    }`}
                    placeholder="Descrição"
                    name="description"
                />
                                <div className="invalid-feedback d-block">
                                    {errors.description?.message}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-crud-buttons-container">
                        <button
                            className="btn btn-outline-danger product-crud-button"
                            onClick={handleCancel}
                        >
                            CANCELAR
                        </button>
                        <button className="btn btn-primary product-crud-button text-white">
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};


export default Form;