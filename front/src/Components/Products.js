import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import ProductCard from './ProductCard';
import styles from './product.module.css';
import { Link } from 'react-router-dom';

import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ProductsCards(params, {productsCart}) {
  let location = useLocation();

  let products = params.products

  useEffect(() => {

  }, [])
  if(productsCart){
    return(
      <div className={styles.main}>
      {productsCart && productsCart.map(product=>{
        return <ProductCard product={product}/>
      })}
    </div>
    )
  }
  return (
    <div className={styles.main}>
      {products && products.map(product=>{
        return <ProductCard product={product}/>
      })}
    </div>


  );
};


{/* //  key={product.id}>
          // <ProductCard
          // image={product.image}
          // key={product.id}
          // id={product.id}
          // name={product.name}
          // price= {product.price}
          // stock={product.stock} */}