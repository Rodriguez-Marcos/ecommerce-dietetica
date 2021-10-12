import React, { useEffect } from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';
import emptyCart from '../../Utils/emptycart';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie'

export default function Success(){
    useEffect(() => {
        emptyCart(window.localStorage.jwt)
    }, [])

    return (
        <div>
        <NavBar/>
        <div className={Styles.div}>
            <h1>Gracias Por tu compra</h1>
        </div>
        </div>
    )



}