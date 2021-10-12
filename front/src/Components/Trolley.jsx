import 'boxicons';
import './Trolley.css'
import { DataContext } from "../Contexts/DataProvider"
import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import './Trolley.css'
import { Link } from "react-router-dom";
import getCart from "../Utils/getCart";
import { useHistory } from "react-router";
import axios from 'axios'
import getTrolleyAction from "../Actions";
import NavBar from "./NavBar";
import removePC from '../Utils/removePC';
import postCarrito from '../Utils/postCarrito';


export default function Trolley() {
  const value = useContext(DataContext)
  const [carrito, setCarrito] = value.carrito;
  const [total, setTotal] = value.total;
  const [menu, setMenu] = value.menu;
  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo)
  let { productsCart } = useSelector(state => state.cart)

  useEffect(()=>{
		setCarrito(productsCart)
	},[productsCart])

  const reduce = id => {
    carrito.forEach(item => {
      if (item.id === id) {
        if (item.cantidad > 1) {
          if (isLogin) postCarrito(token,{id,quantity: item.cantidad-1});
          item.cantidad -= 1;
          cookies.set('trolley', cookies.get('trolley').map(x => {
            if (x.id === id) {
              return { ...x, quantity: x.quantity - 1 }
            } else { return { ...x } }
          }))
        }
      }
      setCarrito([...carrito])
    })

  }
  const increase = id => {
    carrito.forEach(item => {
      if (item.id === id) {
        item.cantidad += 1;
        if (isLogin) postCarrito(token,{id,quantity: item.cantidad });
        cookies.set('trolley', cookies.get('trolley').map(x => {
          if (x.id === id) {
            return { ...x, quantity: x.quantity + 1 }
          } else { return { ...x } }
        }))
      }
      setCarrito([...carrito]);
      
    })
  }
  const handleClose = id=>{
        let handle = []
        dispatch({type:'REMOVE', payload: id})
        cookies.get('trolley').forEach(x => {
          if (x.id !== id) {
            handle.push({ ...x });
          }
        })
        cookies.set('trolley', handle)
        if (isLogin) removePC(token, [id]);
        
      setCarrito([...carrito.filter(x=>x.id!==id)])
    }










  const cookies = new Cookies();

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
      data: data,
    };

    axios(config)
      .then(function (response) {
        return (JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  useEffect(() => {
    if (isLogin) {
      getCart(token);
    }
    dispatch(getTrolleyAction())
  }, [isLogin])

    return (
      <div className="carritos show">
        <div className="carrito show">
          <div className="carrito__close">
            <box-icon onClick={()=>{setMenu(false)}} name="x"></box-icon>
          </div>
          <h2>Su carrito:</h2>
          {carrito?.map((producto) => (

            // {console.log(e)}

            <div className="carrito__center">
              <div className="carrito__item" key="">
                <img className="img" src={producto.image} alt=""></img>
                <div >
                  <h3>{producto.name}</h3>
                  <p className="price">${producto.price}</p>
                </div>
                <div>
                
                  <box-icon onClick={() => increase(producto.id)}  name="up-arrow" type="solid"></box-icon>
                  <h3 className="cantidad">{producto.cantidad}</h3>
                  
                  <box-icon onClick={() => reduce(producto.id)} name="down-arrow" type="solid"></box-icon>
                </div>
                <div className="remove__item">
                  <box-icon onClick={()=>handleClose(producto.id)} name="trash"></box-icon>
                </div>
              </div>


            </div>
          ))}
          <div className="carrito__footer">
            <h3>Total: ${total}</h3>
            {!isLogin ? <button className="btn"><Link to='/Login' onClick={()=>{setMenu(false)}} className="btn btn-success">Inicia sesión para iniciar su compra </Link></button> : false}
            <br /> <br />
            {isLogin ? <button className="btn" onClick={handleSubmit}>Comprar</button>:false}
          </div>




        </div>


      </div>



    )
  }





