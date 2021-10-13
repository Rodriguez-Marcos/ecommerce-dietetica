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
      if (isLogin) postCarrito(token, { id, quantity });
    }
    cookies.set('trolley', trolley)
    dispatch({
      type: 'COMODIN',
    })
  }

  return (
    <div id="a" key={product.id}>
      <div id="card">
        <h5 id="nombre_producto">{product.name}</h5>
        <div id="divImg">
          <img  src={product.image ? product.image : defaultimg} />
        </div>
        <div  id="info">
          <h4 id="precio">Precio ${product.price}</h4>
          <Link id="detalles" to={`/Detail/${product.id}`} >Ver este producto</Link>
          {(location.pathname !== '/trolley') ? product.stock>0?<Button id="carrito" onClick={(e) => handleClickTrolley(e)} >Agregar  <Card.Img id="carritoimg" src={compras} /></Button>:<Button style={{backgroundColor: '#e3001b'}} onClick={()=>{alert('Fuera de Stok, estamos trabajando para reponerlo :)')}} id="carrito"  >Agregar  <Card.Img id="carritoimg" src={compras} /></Button> : false}
        </div>
      </div>
    </div>
  );
}


export default connect(null, null)(ProductCard);