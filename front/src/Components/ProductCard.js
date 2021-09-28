import React from 'react';


export function ProductCard({ name,price,id,description,stock,image }) {
  return (
    <div className='cartas'>
        <div key={id}>
        <img className='imagenrota' src={image} alt='Falta Imagen'/>
        <h2>{name}</h2>
        <h5>{description}</h5>
        <h4>{price}</h4>
        <h4>{description}</h4>
        <h4>{stock}</h4>
        </div>
    </div>
  );
}

export default ProductCard