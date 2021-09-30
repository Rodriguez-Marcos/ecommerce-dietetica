import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { getDiets, getCategories, getByIdCategory, getProducts,orderPrice,getByIdDiet } from "../Actions";
import {Form, Button, Overlay, Tooltip} from 'react-bootstrap'
import './Filters.css'


function ProductsFilters({ getDiets, getCategories, getByIdCategory, getProducts,categories,diets, orderPrice,products,getByIdDiet }) {


    useEffect(() => {
        getCategories()
        }, [])

    useEffect(() => {
        getDiets()
        }, [])



    function handleCategory(event) {

        if (event.target.value !== 'Categories') {
            return getByIdCategory(event.target.value)
        }
         getProducts();
    };

    
    function handleDiet(event) {

        if (event.target.value === 'Diets') {
            return getProducts();
        }
        getByIdDiet(event.target.value)
    };




    function handlePrice(event) {

        if (event.target.value === 'Price') {
            return getProducts();
        }
        orderPrice(products,{tipe:event.target.value})
        
    }
    
    

    return (
        <div className="Selects">
             <Form.Control id="select" size="sm" as="select"     onChange={handleCategory}>
             <option id="op" label='Categories' value='Categories'></option>
                {categories.length ? categories.map((cat, i) => (
                        <option id="op" key={i} value={cat.id} label={cat.name}></option>
                    )) : null}    
           
            </Form.Control>
           
            <Form.Control id="select" size="sm" as="select" onChange={handleDiet}>
            <option id="op" label='Diets' value='Diets'></option>
                {diets.length ? diets.map((diet, i) => (
                        <option id="op" key={i} value={diet.id} label={diet.name}></option>
                    )) : null}
            </Form.Control>
    
            <Form.Control id="select" size="sm" as="select" onChange={handlePrice}>
            <option id="op" label='Price' value='Price'></option>
                    <option id="op" value='Ascendent' >Ascendent</option>
                    <option id="op" value='Descendent' >Descendent</option>
            </Form.Control>
        </div>
    )
}

const mapStateToProps = ((state) => {

    return {
        products: state.reducerPablo.products,
        categories: state.reducerPablo.categories,
        diets: state.reducerPablo.diets,
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        getDiets: () => dispatch(getDiets()),
        getByIdCategory: (id) => dispatch(getByIdCategory(id)),
        getByIdDiet: (id) => dispatch(getByIdDiet(id)),
        getProducts: () => dispatch(getProducts()),
        orderPrice: (orderTarget, product) => dispatch(orderPrice(orderTarget, product)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilters)