import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import './productsgrid.css'

export default function ProductsCards( params) {
  
  let products = params.products

  
  useEffect(()=>{

  },[])
  return (
             <div >
              {products && products.map((product) => (
                
                <div  className="Recetario" key={product.id}>
          <ProductCard
          image={product.image}
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          stock={product.stock}
          />
          </div>
          
          ))}
    </div>
    
  );
};


