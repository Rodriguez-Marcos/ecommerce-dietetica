import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import './ProductCard.css'
import defaultimg from '../image/salvatore-grande-color.png'
import borrar from '../image/cancelar.png'
import compras from '../image/carrito.png'
import postCarrito from '../Utils/postCarrito';


const cookies = new Cookies();




export function ProductCard({ product }) {
  let location = useLocation();
  let dispatch = useDispatch();
  let { isLogin, token } = useSelector(state => state.reducerPablo);

  function handleClickTrolley(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === product.id)) {
      trolley.push(product);
      if(isLogin)postCarrito(token, [product.id]);
    }
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
    <Card style={{ width: '18rem' }} id="a" key={product.id}>
      <Card.Title>{product.name}</Card.Title>
      <Card id="divImg">
        <Card.Img id="img" variant="top" src={product.image ? product.image : defaultimg} />
        <Card id="precio">Precio ${product.price}</Card>
      </Card>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
        
          

          <Link id="detalles" to={`/Detail/${product.id}`} >Ver este producto</Link>
        </ListGroupItem>
        <ListGroupItem id="btns">
          {location.pathname !== '/trolley' ? <Button id="carrito" onClick={(e) => handleClickTrolley(e)} >Agregar  <Card.Img id="carritoimg" src={compras} /></Button> : false}
          {location.pathname === '/trolley' ? <Button id="borrarBtn" onClick={e => handleClose(e)}><Card.Img id="borrarimg" src={borrar} /></Button> : false}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}


export default connect(null, null)(ProductCard);