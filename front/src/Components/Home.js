import React, { useEffect } from "react";
import { connect } from "react-redux"
import { getProducts } from "../Actions/index";
import './Home.css'
import ProductsCards from './Products'
import { Image} from 'react-bootstrap'
import banner from '../image/BANNER-SALVATORE.jpg'
import ProductsFilters from './Filters'
import Example from './PromosHome'
import NavBar from './NavBar'

function ProductsHome({ products, getProducts }) {

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div >
            <NavBar />
            <Image id="banner" src={banner} fluid />
            <Example></Example>
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