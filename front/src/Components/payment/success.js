import React, { useEffect, useState } from 'react';
// import Styles from './payment.module.css'
import styles from './success.module.css'
import NavBar from '../NavBar';
import success from '../img/succes22.png'
import emptyCart from '../../Utils/emptycart';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie'
import { Style } from '@material-ui/icons';
// import { postAdress } from '../../Actions';

export default function Success(){
    const myStorage = window.localStorage;

    // let [input, setInput]=useState({
    //     direccion: ' ',
    //     altura: ' ',
    //     otros: ' ',
    //     ciudad: ' ',
    //     provincia: ' ',
    //     numero: ' ',
    // })

    // function handleAdress(event) {
    //     setInput({
    //         ...input,
    //         [event.target.name]: event.target.value
    //     })
    // }



    // useEffect(() => {
    //     emptyCart(myStorage.getItem('jwt'))
    // }, [])

    // async function handleSubmit(event) {
    //     event.preventDefault()
    //     if (!input.direccion || !input.altura || !input.ciudad || !input.provincia || !input.numero) { alert('Debes llenar todos los campos') }
    //     else {
    //          //postAdress(input) 
    //          alert('Gracias por confiar en nosotros')}}

    return (
        <div>
            <NavBar />
            <div className={styles.main} >
            <div class="card" className={styles.card} >
         <img src={success} class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Pago exitoso!</h5>
            <p class="card-text">Muchas gracias por su compra</p>
            <a href="#" class="btn btn-primary">Volver al inicio</a>
         </div>
        </div>
        

               
            </div>
            </div>
        
            

     
    )



}