import React, { useEffect } from "react";
import { connect } from "react-redux"
import { getProducts } from "../Actions/index";
import ProductsCards from '../Components/Products'



function ProductsHome({ products, getProducts }) {

  
    useEffect(() => {
        getProducts()
     //eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])


    return (
        <div >
                <div className='home'>
                <ProductsCards
                    products={products} /> 
            </div> 

        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome)