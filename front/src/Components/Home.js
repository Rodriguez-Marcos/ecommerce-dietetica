import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getProducts } from "../Actions/index";
import './Home.css'
import ProductsCards from './Products'
import { Image, Button, Overlay, Tooltip, OverlayTrigger } from 'react-bootstrap'
import banner from '../image/BANNER-SALVATORE.jpg'
import ProductsFilters from './Filters'
import Example from './PromosHome'


function ProductsHome({ products, getProducts }) {

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div >
            <Example></Example>
            <Image id="banner" src={banner} fluid />
            <ProductsFilters />
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