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
  let { isLogin, token, comodin } = useSelector(state => state.reducerPablo)
  let { productsCart } = useSelector(state => state.cart)

  useEffect(()=>{
		setCarrito(productsCart)
	},[productsCart])

  const reduce = id => {
    carrito.forEach(item => {
      if (item.id === id) {
        if (item.cantidad > 1) {
          if (isLogin) postCarrito(token,{id,quantity: -1});
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
        cookies.set('trolley', cookies.get('trolley').map(x => {
          if (x.id === id) {
            return { ...x, quantity: x.quantity + 1 }
          } else { return { ...x } }
        }))
      }
      setCarrito([...carrito]);
      
      if (isLogin) postCarrito(token,{id,quantity:-1 });
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
      "payment": "mercadopago",
      items: cookies.get('trolley')
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


  useEffect(() => {
    if (isLogin) {
      getCart(token);
    }
    dispatch(getTrolleyAction())
  }, [isLogin])

  if (!cookies.get('trolley')?.length) {
    return (
      <div className="carritos show">
        <div className="carrito show"></div>
        <div id="carritoCompras">
          <Link to='/home'>ir al home</Link>
          <h2 style={{
            textAlign: "center",
            fontSize: "3rem"
          }}>Agrega productos para iniciar su compra</h2>
          {!isLogin ? <button className="btn"><Link to='/Login' className="btn btn-success">Inicia sesión para iniciar su compra </Link></button> : false}
        </div>
      </div>
    )

  } else {

    return (
      <div className="carritos show">
        <div className="carrito show">
          <div className="carrito__close">
            <box-icon name="x"></box-icon>
          </div>
          <h2>Su carrito:</h2>
          {/* const productStock = productsCart?.find(
                (product) => product._id === elem._id)?.stock; */}
          {carrito?.map((producto) => (

            // {console.log(e)}

            <div className="carrito__center">
              <div className="carrito__item" key="">
                <img src={producto.image} alt=""></img>
                <div >
                  <h3>{producto.name}</h3>
                  <p className="price">${producto.price}</p>
                </div>
                <div>

                  <box-icon onClick={() => increase(producto.id)} name="up-arrow" type="solid"></box-icon>
                  <p className="cantidad">{producto.cantidad}</p>
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
            {!isLogin ? <button className="btn"><Link to='/Login' className="btn btn-success">Inicia sesión para iniciar su compra </Link></button> : false}
            <br /> <br />
            {isLogin ? <button className="btn" onClick={handleSubmit}>Comprar</button>:false}
          </div>




        </div>


      </div>



    )
  }
}

































// import { useDispatch, useSelector } from "react-redux";
// import ProductsCards from "./Products";
// import Cookies from "universal-cookie";
// import './Trolley.css'
// import { Link } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import getCart from "../Utils/getCart";
// import CartContext, { UserContextProvider } from "../Contexts/UserContext"
// import { useHistory } from "react-router";
// import axios from 'axios'
// import getTrolley from "../Utils/getTrolley";
// import getTrolleyAction from "../Actions";






// const cookies = new Cookies();

// export default function Trolley() {
//   const dispatch = useDispatch();
//     useEffect(() =>{},[payment])
//     const history = useHistory();
//     async function  handleSubmit(event){
//         event.preventDefault();
//         var data = JSON.stringify({
//             "payment": "mercadopago"
//           });

//           var config = {
//             method: 'post',
//             url: 'http://localhost:3001/payment',
//             headers: { 
//               'Authorization': 'Bearer ' + token, 
//               'Content-Type': 'application/json'
//             },
//             data : data
//           };

//           axios(config)
//           .then(function (response) {
//             window.location.replace(response.data);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });

//         }

//     async function payment(token){
//         var data = JSON.stringify({
//             "payment": "mercadopago"
//           });

//           var config = {
//             method: 'post',
//             url: 'http://localhost:3001/payment',
//             headers: { 
//               'Authorization': 'Bearer ' + token, 
//               'Content-Type': 'application/json'
//             },
//             data : data
//           };

//           axios(config)
//           .then(function (response) {
//             return(JSON.stringify(response.data));
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//     }



//     let { isLogin, token, comodin } = useSelector(state => state.reducerPablo)
//     let {productsCart} = useSelector(state=>state.cart)
//     useEffect(() => {
//         console.log('hola:',isLogin)
//         if (isLogin) {
//             getCart(token);
//         }
//         dispatch(getTrolleyAction())
//     }, [isLogin])

//     if (!cookies.get('trolley')?.length) {
//         return (
//             <div id="carritoCompras">
//                 <a href='/home'>ir al home</a>
//                 <h1>No hay nada en el carrito aun</h1>
//                 {!isLogin ? <button><Link to='/Login' className="btn btn-success">Logueate para empezar a comprar </Link></button> : false}
//             </div>)
//     } else {
//         return (
//             <div id="cardCarrito">
//                 {!isLogin ? <button><Link to='/Login' className="btn btn-success">Logueate para empezar a comprar </Link></button> : false}
//                 <h1>Productos agregados</h1>

//                 <ProductsCards id="card" products={productsCart} />

//                 <br/>
//                 <br/>
//                 <br/>
//                 <div >
//                 {/* {total ? <h2>Total ${total}</h2> : ''} */}
//                 <p >Total: $</p>

//                 <Link to="/form" className="btn btn-success" onClick={handleSubmit} >
//                     Iniciar compra
//                  </Link>
//                 </div>


//             </div>
//         )
//     }
// }
