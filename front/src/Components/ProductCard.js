import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
// import './ProductCard.css'


const cookies = new Cookies();




export function ProductCard({ product }) {
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
    <Card style={{ width: '18rem' }} id="a">
      {location.pathname === '/trolley' ? <h5 onClick={e => handleClose(e)}>x</h5> : false}
      <Card.Title>{product.name}</Card.Title>
      <Card id="divImg">
        <Card.Img id="img" variant="top" src={product.image} alt="Not Found" />
      </Card>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Precio actual ${product.price}</ListGroupItem>
        <ListGroupItem>
          <Link to={`/Detail/${product.id}`} >Ver este producto</Link>
        </ListGroupItem>
        <ListGroupItem>
          {location.pathname !== '/trolley' ? <button onClick={(e) => handleClickTrolley(e)} >Agregar al carrito</button> : false}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}


export default connect(null, null)(ProductCard);