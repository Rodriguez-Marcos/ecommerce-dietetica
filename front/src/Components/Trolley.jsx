import { useSelector } from "react-redux";
import ProductsCards from "./Products";
import Cookies from "universal-cookie";
import './Trolley.css'
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import getCart from "../Utils/getCart";
import  payment  from '../Utils/Payment'
import CartContext from "../Contexts/UserContext"




const cookies = new Cookies();

export default function Trolley() {
  
    function handleSubmit(event){
        event.preventDefault();
        payment(token)
    }
    


    let { isLogin, token, comodin } = useSelector(state => state.reducerPablo)
    useEffect(() => {
        console.log('hola:',isLogin)
        if (isLogin) {
            getCart(token);
        }
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
            <div id="cardCarrito">
                {!isLogin ? <button><Link to='/Login' className="btn btn-success">Logueate para empezar a comprar </Link></button> : false}
                <h1>Productos agregados</h1>
                <ProductsCards id="card" products={cookies.get('trolley')} />
                <br/>
                <br/>
                <br/>
                <div >
                {/* {total ? <h2>Total ${total}</h2> : ''} */}
                <p >Total: $</p>
         
                <Link to="/form" className="btn btn-success" onClick={handleSubmit} >
                    Iniciar compra
                 </Link>
                </div>
                

            </div>
        )
    }
}

// import React from 'react';
// import ProductCard from './ProductCard';

// export default function Trolley ({product}) {
// //   const { product, onAdd } = props;
//   return (
//     <main className="block col-2">
//       <h2>Products</h2>
//       <div className="row">
//       {product && product.map(product=>{
//         return <ProductCard product={product.id} image={product.image} price={product.price}/>
      
//       })}
//       </div>
//     </main>
//   );
// }