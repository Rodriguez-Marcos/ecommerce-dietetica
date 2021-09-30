import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import styles from './product.module.css';
import { Link } from 'react-router-dom';



const cookies = new Cookies();




export function ProductCard({product}) {
  let location = useLocation();
  let dispatch = useDispatch();

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
      <div key={product.id}>
          <div className={styles.cardContainer}>
        {location.pathname === '/trolley' ? <h5 style={{ position: 'relative', color: 'red', left: '290px', top: '2px' }} onClick={e => handleClose(e)}>x</h5> : false}
            <div className={styles.cardName}>{product.name}</div>

            <img className={styles.cardFoto} src={product.image} alt="Not Found" />
            <div className={styles.cardAttack}>${product.price}</div>
          </div>
          <div className={styles.detail}>
            <Link to={`/Detail/${product.id}`} style={{ color: "black", textDecoration: "none" }}>
              <p>
                Ver este producto
              </p>
            </Link>
          </div>

          {location.pathname !== '/trolley' ?<button onClick={(e)=>handleClickTrolley(e)} className={styles.boton}>Agregar al carrito</button>:false}


        </div>
  );
}


export default connect(null, null)(ProductCard);