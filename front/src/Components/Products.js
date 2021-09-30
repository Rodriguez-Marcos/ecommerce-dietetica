import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import styles from './product.module.css'
import { Link } from 'react-router-dom';

export default function ProductsCards( params) {
  
  let products = params.products

  
  useEffect(()=>{

  },[])
  return (
    <div className={styles.main}>
      
        {products && products.map((product) => (
          <div>
         
         <div className={styles.cardContainer}>
          <div className={styles.cardName}>{product.name}</div>
          
          <img className={styles.cardFoto} src={product.image} alt="Not Found"  />
          <div className={styles.cardAttack}>${product.price}</div>
          </div>
          <div className={styles.detail}>
         <Link  to={`/Detail/${product.id}`} style={{ color: "black", textDecoration: "none" }}>
         <p>
           Ver este producto
          </p>
         </Link>
         </div>
         
         <button className={styles.boton}>Agregar al carrito</button>
     
     
          </div>
          
          
      
         
        
              
         
          
      
          
          ))}
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