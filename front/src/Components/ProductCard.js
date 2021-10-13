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
import { Favorite, RemoveShoppingCart, ShoppingCartSharp } from '@material-ui/icons';
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
const cookies = new Cookies();




export function ProductCard({ product }) {
  const [counter, setCounter] = useState(1);
  let location = useLocation();
  let dispatch = useDispatch();
  let { isLogin, token } = useSelector(state => state.reducerPablo);

  function handleClickTrolley(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === product.id)) {
      let quantity = counter;
      let { id } = product;
      trolley.push({ id, quantity });
      alert("Se añadio a tu carrito")
      if (isLogin) postCarrito(token, { id, quantity });
    }
    cookies.set('trolley', trolley)
    dispatch({
      type: 'COMODIN',
    })
  }
  function actualizateQuantity() {
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : []; /// trolley : []
    if (!trolley.find(x => x.id === product.id)) {
      let quantity = counter;
      let { id } = product;
      trolley.push(product);
      if (isLogin) postCarrito(token, { id, quantity });
    }
  }

  function handleClose(e) {
    e.preventDefault();
    let trolley = Array.isArray(cookies.get('trolley')) ? [...cookies.get('trolley')] : [];
    cookies.set('trolley', trolley.filter(x => x.id !== product.id))
    if (isLogin) removePC(token, [product.id]);
    dispatch({
      type: 'COMODIN',
    })
  }
  function handleFavorite() {
    alert("Se añadio a tus favoritos")
  }
  return (
    <div id="a" key={product.id}>
      <div id="card">
        <Link id="detalles" to={`/Detail/${product.id}`}>
          <h5 id="nombre_producto">{product.name}</h5>
        </Link>
        <div id="divImg">
          <Link id="detalles" to={`/Detail/${product.id}`}>
            <img src={product.image ? product.image : defaultimg} />
          </Link>
          <div id="favorite-carrito">
            <div id="favorite">
              <input className="corazon" id="heart" onClick={handleFavorite} type="checkbox" />
              <label for="heart"><Favorite /></label>
            </div>
            <h5 id="precio">${product.price}</h5>
            <div id="carroCompras">
              {location.pathname !== '/trolley' ? <button id="carrito" onClick={(e) => handleClickTrolley(e)} ><ShoppingCartSharp id="carritoimg" /></button> : false}
            </div>
          </div>
        </div>
        <div id="info">
        </div>
      </div>
    </div>
  );
}


export default connect(null, null)(ProductCard);