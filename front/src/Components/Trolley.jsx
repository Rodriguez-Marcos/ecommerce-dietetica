import { useDispatch, useSelector } from "react-redux";
import ProductsCards from "./Products";
import Cookies from "universal-cookie";
import './Trolley.css'
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import getCart from "../Utils/getCart";
import CartContext, { UserContextProvider } from "../Contexts/UserContext"
import { useHistory } from "react-router";
import axios from 'axios'
import getTrolley from "../Utils/getTrolley";
import getTrolleyAction from "../Actions";
import NavBar from "./NavBar";






const cookies = new Cookies();

export default function Trolley() {
  const dispatch = useDispatch();
  useEffect(() => { }, [payment])
  const history = useHistory();
  async function handleSubmit(event) {
    event.preventDefault();
    var data = JSON.stringify({
      "payment": "mercadopago"
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/payment',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        window.location.replace(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  async function payment(token) {
    var data = JSON.stringify({
      "payment": "mercadopago"
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/payment',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        return (JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo)
  let { productsCart } = useSelector(state => state.cart)
  useEffect(() => {
    console.log('hola:', isLogin)
    if (isLogin) {
      getCart(token);
    }
    dispatch(getTrolleyAction())
  }, [isLogin])

  if (!cookies.get('trolley')?.length) {
    return (
      <div id="carritoCompras">
        <a href='/home'>ir al home</a>
        <h1>No hay nada en el carrito aun</h1>
        {!isLogin ? <button><Link to='/Login' className="btn btn-success">Logueate para empezar a comprar </Link></button> : false}
      </div>)
  } else {
    return (
      <div>
        <NavBar />
        <div id="cardCarrito">
          {!isLogin ? <button><Link to='/Login' className="btn btn-success">Logueate para empezar a comprar </Link></button> : false}
          <h1>Productos agregados</h1>

          <ProductsCards id="card" products={productsCart} />

          <br />
          <br />
          <br />
          <div >
            {/* {total ? <h2>Total ${total}</h2> : ''} */}
            <p >Total: $</p>

            <Link to="/form" className="btn btn-success" onClick={handleSubmit} >
              Iniciar compra
            </Link>
          </div>


        </div>
      </div>
    )
  }
}