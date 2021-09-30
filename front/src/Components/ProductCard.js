import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();




export function ProductCard(product) {
  const { name, price, id, description, stock, image } = product;
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();


  function handleClick() {
    history.push('/Detail/' + id);
  }
  function handleClickTrolley(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : [];
    if (!trolley.find(x => x.id === product.id))
      trolley.push(product);
    cookies.set('trolley', trolley)
  }
  function handleClose(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : [];
    cookies.set('trolley', trolley.filter(x => x.id !== product.id))
    dispatch({
      type: 'COMODIN',
    })
  }

  return (
    <div  >
      {console.log(location.pathname)}
      <div key={id}>
        {location.pathname === '/trolley' ? <h5 style={{ position: 'absolute', color: 'red' }} onClick={e => handleClose(e)}>x</h5> : false}
        <img src={image || 'https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg'} alt={'imagen nro:' + id + ' no encontrada'} />
        <h2>{name}</h2>
        <h5>{description}</h5>
        <h4>{price}</h4>
        <h4>{description}</h4>
        <h4>{stock}</h4>
        <button onClick={e => handleClickTrolley(e)}>Agregar al Carrito</button>
      </div>
    </div>
  );
}


export default connect(null, null)(ProductCard);