import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import ProductCard from './ProductCard';
import styles from './product.module.css';
import { Link } from 'react-router-dom';

import Cookies from "universal-cookie";
import axios from 'axios';
import getFavorites from '../Utils/getFavorites';

const cookies = new Cookies();

export default function ProductsCards() {
  let location = useLocation();
  const dispatch = useDispatch();
  let { isLogin, token, comodin, products } = useSelector(state => state.reducerPablo);
  const myStorage = window.localStorage;

  
  useEffect(async ()=>{
    console.log(comodin)
    if(isLogin)
    {
      let res = await getFavorites(myStorage.getItem('jwt'));
      products.forEach(product=>{
        res.data[0].products.forEach(x=>{
          if(product.id=== x.id)
            if(!product.isFavorite)
              product.isFavorite = true
        })
      })
    }
    dispatch({type: 'GET_PRODUCTS', payload: products})
  },[comodin])

  return (
    <div className={styles.main}>
      {products && products?.map(product=>{
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