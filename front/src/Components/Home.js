import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getProducts } from "../Actions/index";
import './Home.css'
import ProductsCards from './Products'




function ProductsHome({ products, getProducts }) {

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div >
                <div className='home'>
                <ProductsCards
                    products={products} /> 
            </div> 

        </div>
    )
};



const mapStateToProps = (state) => {

    return {
        products: state.reducerPablo.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome)