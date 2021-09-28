import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

function ProductsCards({ products }) {

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


const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, null)(ProductsCards);