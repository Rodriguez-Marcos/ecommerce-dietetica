import React from 'react';import { useHistory } from 'react-router-dom';




export function ProductCard({ name,price,id,description,stock,image }) {
  let history = useHistory();

  function handleClick(){
  history.push('/Detail/'+id)  
  }

  return (
    <div  onClick={()=>handleClick()}>
        <div key={id}>
        <img  src={image || 'https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg'} alt={'imagen nro:'+id+' no encontrada'}/>
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