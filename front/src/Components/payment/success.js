import React, { useEffect, useState } from 'react';
// import Styles from './payment.module.css'
import styles from './success.module.css'
import NavBar from '../NavBar';
import success from '../img/succes22.png'
import {createOrder} from '../../Utils/emptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import Cookies from 'universal-cookie'
import { Style } from '@material-ui/icons';
import 'boxicons';
// import { postAdress } from '../../Actions';
let cookies = new Cookies();

export default function Success(){
    const dispatch =useDispatch();
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
    const {isLogin}= useSelector(state=>state.cart)
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'REMOVE_ALL'});
        createOrder(myStorage.getItem('jwt'));
        cookies.set('trolley',[]);
        if (!myStorage.getItem('jwt')) history.push('/');
    }, [isLogin])

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
         <img src={success} class="card-img-top" className={styles.img} alt="..." />
        <div class="card-body" className={styles.body}>
            <h5 class="card-title">Pago exitoso!</h5>
            <p class="card-text">¡Muchas gracias por su compra!</p>
            <a href="/" class="btn btn-primary">Volver al inicio</a>
         </div>
        </div>
        
        <br/> <br/> 
               
            </div>
            <br/> <br/> 
            
                <p className={styles.dudas}>¿Dudas? <br/> </p>
                <p className={styles.click}>Click en el logo para comunicarte con un asesor de Salvatore!</p>
            <div class={styles.socialMedia}>
                <a href="https://web.whatsapp.com/"
                    rel='noreferrer' target="_BLANK" className={styles.socialMediaIcon}>
              
                    <box-icon type='logo' name='whatsapp'></box-icon>
                </a>
             
                <a href="mailto:salvatoretiendasaludable@gmail.com" className={styles.socialMediaIcon}>
                <box-icon name='mail-send' ></box-icon>
                </a>
            </div>
            </div>
            

     
    )



}