import React, { useContext, useEffect, useState } from 'react';
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
import removePC from '../Utils/removePC';
import { RemoveShoppingCart } from '@material-ui/icons';
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
const cookies = new Cookies();




export function ProductCard({ product }) {
  const [ counter, setCounter ] = useState (1);
  let location = useLocation();
  let dispatch = useDispatch();
  let { isLogin, token } = useSelector(state => state.reducerPablo);

  function handleClickTrolley(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === product.id)) {
      let quantity = counter;
      let { id } = product;
      trolley.push({id, quantity});
      if (isLogin) postCarrito(token, [...trolley]);
    }
    cookies.set('trolley', trolley)
    dispatch({
      type: 'COMODIN',
    })
  }
  function actualizateQuantity(){
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === product.id)) {
      product.quantity = counter;
      trolley.push(product);
      if (isLogin) postCarrito(token, [...trolley]);
    }
  }

  function handleClose(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : [];
    console.log(trolley.filter(x => x.id !== product.id))
    cookies.set('trolley', trolley.filter(x => x.id !== product.id))
    if (isLogin) removePC(token, [product.id]);
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

          {(location.pathname === '/trolley') ? <div  >
            <div >
              <div >
                <span

                  onClick={(e) =>{ setCounter(counter - 1);actualizateQuantity(e)}}
                >
                  <RemoveIcon />
                </span>
                <span className="counter__content-controls-value">  {counter} </span>
                <span
                  className="counter__content-controls-add"
                  onClick={(e) =>{ setCounter(counter + 1);actualizateQuantity(e)}}

                >
                  <AddIcon />


                </span>
              </div>
            </div>
          </div>: false}
          {location.pathname !== '/trolley' ? <Button id="carrito" onClick={(e) => handleClickTrolley(e)} >Agregar  <Card.Img id="carritoimg" src={compras} /></Button> : false}
          {location.pathname === '/trolley' ? <Button id="borrarBtn" onClick={e => handleClose(e)}><RemoveShoppingCart id="borrarimg" /></Button> : false}
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}


export default connect(null, null)(ProductCard);