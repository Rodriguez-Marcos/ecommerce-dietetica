import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getProducts } from "../Actions/index";
import ProductsCards from '../Components/Products'



function ProductsHome({ products, getProducts }) {
  const [productos,setProductos]=useState([])
    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div >
            <h1>soy un home</h1>
                <div className='home'>
                  {console.log(products)}
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