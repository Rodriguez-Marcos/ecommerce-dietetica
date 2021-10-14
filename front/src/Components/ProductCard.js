import React, { useContext, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
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
import postFavorites from '../Utils/postFavorites';
import axios from 'axios';
import usePath from '../Hooks/UsePaths';
const cookies = new Cookies();




export function ProductCard({ product }) {
  const [counter, setCounter] = useState(1);
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let { isLogin, token } = useSelector(state => state.reducerPablo);
  let { pushPath } = usePath();
  
  useEffect(()=>{

  },[addFavorite])
  

  function handleClickTrolley(e) {
    console.log(product.id)
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

  async function addFavorite(e){
    if (!isLogin){
      pushPath();
      history.push('/login');
    };
  await postFavorites(product.id,token);
  product.isFavorite = true;
  dispatch({
    type: 'COMODIN',
  })
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
              <input className="corazon" id={"heart"+product.id} onClick={()=>{addFavorite()}} type="checkbox" />
              <label htmlFor={"heart"+product.id}><Favorite style={product.isFavorite?{color: 'rgb(28 104 28)'}:{color: 'rgb(187 255 187)'}}  /></label>
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