import React, { useState, useEffect, useContext } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import ProductCard from './ProductCard';
import styles from './product.module.css';
import { Link } from 'react-router-dom';

import Cookies from "universal-cookie";
import axios from 'axios';
import getFavorites from '../Utils/getFavorites';
import { getProducts } from '../Actions';
import { DataContext } from '../Contexts/DataProvider';

const cookies = new Cookies();

export default function ProductsCards({products}) {
  const dispatch = useDispatch();
  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo);
  const myStorage = window.localStorage;

  
  useEffect( async ()=>{
    if(!!myStorage.getItem('jwt')){
    let res = await getFavorites( myStorage.getItem('jwt'))
    dispatch({type: 'GET_PRODUCTS_FAVS', payload: res})}
  },[])

  return (
    <div>
    <div className={styles.main}>
      {products && products?.map(product=>{
        return <ProductCard product={product}/>
      })}
    </div>
   
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