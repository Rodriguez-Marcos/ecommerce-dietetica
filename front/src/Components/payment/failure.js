
import React, { useEffect, useState } from 'react';
import styles from './failure.module.css'
import NavBar from '../NavBar';
import fail from '../img/x.png'
import emptyCart from '../../Utils/emptycart';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';
let cookies = new Cookies();
export default function Failure(){
    const dispatch = useDispatch();
    const myStorage = window.localStorage;
    const {isLogin}= useSelector(state=>state.cart)
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'REMOVE_ALL'})
        emptyCart(myStorage.getItem('jwt'));
                cookies.set('trolley',[]);
                if (!myStorage.getItem('jwt')) history.push('/');
    }, [isLogin])

    return (
        <div>
            <NavBar />
            <div className={styles.main} >
            <div class="card" className={styles.card} >
         <img src={fail} class="card-img-top" className={styles.img} alt="..." />
        
        <div class="card-body" className={styles.body}>
        <br/>
            <h5 class="card-title">¡Ups! Algo salió mal...</h5>
            <p class="card-text">Revise su pago</p>
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