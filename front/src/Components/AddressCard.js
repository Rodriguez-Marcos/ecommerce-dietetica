import React, { useContext, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { deleteAddress } from '../Actions';
import Cookies from 'universal-cookie';
import './ProductCard.css'
import usePath from '../Hooks/UsePaths';
import useUser from '../Hooks/UseUser';
const cookies = new Cookies();




export default function AddressCard({ address }) {
  const myStorage = window.localStorage;
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo);
  let { productsFavs } = useSelector(state => state.favs);
  let { pushPath } = usePath();
  const [fav, setFav] = useState(productsFavs.some(checkId));
  let isFav = productsFavs.some(checkId)
  function checkId({ id }) {
    return id === address.id;
  }
  function borrar(e) {
    const jwt = myStorage.getItem("jwt");
    const { value } = e.target;
   dispatch(deleteAddress(value,jwt))
   window.location.reload()
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
      <button type='submit' value={address.id} onClick={borrar}>Eliminar</button>
      </div>

    </div>
  );
}


