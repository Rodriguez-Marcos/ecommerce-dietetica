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
import { DataContext } from '../Contexts/DataProvider';
import deleteFavorites from '../Utils/deleteFav';
import useUser from '../Hooks/UseUser';
const cookies = new Cookies();




export function ProductCard({ product }) {
  const myStoreage =window.localStorage;
  const {logout} = useUser();
  const [counter, setCounter] = useState(1);
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let { isLogin, token } = useSelector(state => state.reducerPablo);
  let { productsFavs } = useSelector(state => state.favs);
  let { pushPath } = usePath();
  let value = useContext(DataContext);
  let [favorites,setFavorites] = value.favorites;
  const [fav,setFav] = useState(productsFavs.some(checkId));
  let isFav = productsFavs.some(checkId)
  function checkId({id}){
    return id===product.id;
  }
  useEffect(()=>{
    isFav = productsFavs.some(checkId)
  },[])
  

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

  function addFavorite(e){
    if(!isLogin){
      pushPath();
      history.push('/login');
    }
    if(!isFav){
      postFavorites(product.id,token)
      setFav(true)
      dispatch({type:'ADD_FAVS', payload: product})
    }
    else {
      deleteFavorites(product.id,token)
      setFav(false)
      dispatch({type:'REMOVE_FAVS', payload: product.id})
    }
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
              <label htmlFor={"heart"+product.id}><Favorite style={(fav)?{color: 'rgb(28 104 28)'}:{color: 'rgb(187 255 187)'}}  /></label>
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