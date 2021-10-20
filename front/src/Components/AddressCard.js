import React, { useContext, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
// import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import './ProductCard.css'
import defaultimg from '../image/salvatore-grande-color.png'
// import borrar from '../image/cancelar.png'
// import compras from '../image/carrito.png'
import postCarrito from '../Utils/postCarrito';
// import removePC from '../Utils/removePC';
import { Favorite, RemoveShoppingCart, ShoppingCartSharp } from '@material-ui/icons';
// import RemoveIcon from "@material-ui/icons/Remove";
// import AddIcon from "@material-ui/icons/Add";
import postFavorites from '../Utils/postFavorites';
// import axios from 'axios';
import usePath from '../Hooks/UsePaths';
import { DataContext } from '../Contexts/DataProvider';
import deleteFavorites from '../Utils/deleteFav';
import useUser from '../Hooks/UseUser';
const cookies = new Cookies();




export function AddressCard({ address }) {
  const myStoreage =window.localStorage;
  const {logout} = useUser();
  const [counter, setCounter] = useState(1);
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo);
  let { productsFavs } = useSelector(state => state.favs);
  let { pushPath } = usePath();
  const [fav,setFav] = useState(productsFavs.some(checkId));
  let isFav = productsFavs.some(checkId)
  function checkId({id}){
    return id===address.id;
  }

  

  
  return (
    <div id="a" key={address.id}>
      <div id="card">
         <h5 id="calle">Calle: {address.calle}</h5>
         <h5 id="altura">Altura: {address.altura}</h5>
         <h5 id="barrio">Barrio: {address.barrio}</h5>
         <h5 id="otros">Otros: {address.otros}</h5>
         <h5 id="codigo">Codigo: {address.codigo}</h5>
         <h5 id="numero">Numero: {address.numero}</h5>
        </div>
    </div>
  );
}


export default connect(null, null)(AddressCard);