import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getDiets, getCategories, getProducts, orderPrice, getByPrice,getProductsFiltered } from "../Actions";
import { Form, Button, Overlay, Tooltip, Tab, Tabs, Sonnet } from 'react-bootstrap'
import './Filters.css'


function ProductsFilters({ getDiets, getCategories, getProducts, categories, diets, orderPrice, products, getProductsFiltered }) {

    
    const [priceL, setPriceL] = useState('');
    const [priceH, setPriceH] = useState('');
    const [idcategory, setIdcategory] = useState('');
    const [iddiet, setIddiet] = useState('');
    const [sortby, setSortby] = useState('');
    //const [sortbyPrice, setSortbyPrice] = useState('');





    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getDiets()
    }, [])



    function handleCategory(event) {
        if (event.target.value === 'Category') {
            return setIdcategory('')
        }
        return setIdcategory(event.target.value)
    }


    function handleDiet(event) {
        if (event.target.value === 'Dieta') {
            return setIddiet('')
        }
        return setIddiet(event.target.value)
    };

    useEffect(() => {
        getProductsFiltered(idcategory,iddiet,priceL,priceH,sortby)
    }, [idcategory,iddiet,priceL,priceH,sortby])



    function handlePrice(event) {
        setSortby(event.target.value)
    }


    function handleName(event) {
        setSortby(event.target.value)
    }



    function handleByPriceMin(event) {
        return setPriceL(event.target.value)
    }


    function handleByPriceMax(event) {
        return setPriceH(event.target.value)
    }

    function HandleChangeOnSubmit(event) {
        event.preventDefault();
        console.log(priceH)
        console.log(priceL)
        if (priceL > priceH && priceH !== '' ) {
            return alert('Ingresa valores correctos')
        }
        getProductsFiltered(idcategory,iddiet,priceL,priceH,sortby);
    }



    return (
        <Tabs defaultActiveKey="default" transition={false} >
            <Tab id="title" title="Filtros" disabled />
            <Tab id="titleFilter" eventKey="home" title="Categorias">
                {/* <Form> */}
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            className="checkRadio"
                            inline
                            label="Todos"
                            name="Categorias"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handleCategory}
                            value='Category'
                        />
                        {categories.map((cat, i) => (
                            <Form.Check
                                inline
                                label="1"
                                name="Categorias"
                                type={type}
                                id={`inline-${type}-1`}
                                id="op" key={i}
                                value={cat.id}
                                label={cat.name}
                                onChange={handleCategory}
                            >
                            </Form.Check>
                        ))}
                    </div>
                ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Diet" title="Dieta">
                {/* <Form> */}
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Todos"
                            name="Dieta"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handleDiet}
                            value='Dieta'
                        />
                        {diets.map((diet, i) => (
                            <Form.Check
                                inline
                                label="1"
                                name="Dieta"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={handleDiet}
                                id="op" key={i} 
                                value={diet.id} 
                                label={diet.name}>
                            </Form.Check>
                        ))}
                    </div>
                ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="order" title="Ordenar A<->Z">
                {/* <Form> */}
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Sin orden"
                            name="Ordenar"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handleName}
                            value='Name'
                        />
                        <Form.Check
                            inline
                            label="Ascendente"
                            name="Ordenar"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handleName}
                            value='AscendentName'
                        />
                        <Form.Check
                            inline
                            label="Descendente"
                            name="Ordenar"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handleName}
                            value='DescendentName'
                        />
                    </div>
                ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Price" title="Precio">
                {/* <Form> */}
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Sin Orden"
                            name="Precio"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handlePrice}
                            value='Price'
                        />
                        <Form.Check
                            inline
                            label="Ascendente"
                            name="Precio"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handlePrice}
                            value='AscendentPrice'
                        />
                        <Form.Check
                            inline
                            label="Descendente"
                            name="Precio"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={handlePrice}
                            value='DescendentPrice'
                        />
                    </div>
                ))}
                {/* </Form> */}
            </Tab>
            <Tab id="titleFilter" eventKey="Pri" title="Rango de Precio">
            <Form id="range" onSubmit={HandleChangeOnSubmit}>
                    <label>Buscar por rango de precio</label>
                    <div id="rangeMinMax">
                        <label>Valor Minimo</label>
                        <input id="min-max"
                            type="text"
                            placeholder='Min'
                            value={priceL}
                            onChange={handleByPriceMin}
                        />
                        <input onChange={handleByPriceMin} type="range" min="0" max="1000" step="100" class="form-range" id="customRange1"></input>
                    </div>
                    <div id="rangeMinMax">
                    <label>Valor Maximo</label>
                        <input
                            id="min-max"
                            type="text"
                            placeholder='Max'
                            value={priceH}
                            onChange={handleByPriceMax}
                        />
                        <input onChange={handleByPriceMax} type="range" min="0" max="1000" step="100" class="form-range" id="customRange1"></input>
                    </div>
                    <Button type="submit" value='Search' className='enviarformulario' >Buscar</Button>
                </Form>
            </Tab>
        </Tabs>
    )
}

const mapStateToProps = ((state) => {

    return {
        products: state.reducerPablo.products,
        categories: state.reducerPablo.categories,
        diets: state.reducerPablo.diets,
        productsFiltered: state.reducerPablo.products,

    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        getDiets: () => dispatch(getDiets()),
        getProducts: () => dispatch(getProducts()),
        orderPrice: (orderTarget, products) => dispatch(orderPrice(orderTarget, products)),
        getByPrice: (priceL, priceH) => dispatch(getByPrice(priceL, priceH)),
        getProductsFiltered: (idcategory,iddiet,priceL,priceH,sortby) => dispatch(getProductsFiltered(idcategory,iddiet,priceL,priceH,sortby))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilters)