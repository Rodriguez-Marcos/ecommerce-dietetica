import React from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';

export default function Pending(){

    return (
        <div>
        <NavBar/>
        <div className={Styles.div}>
            <h1>Gracias Por tu compra Rey falta pagar nomas </h1>
        </div>
        </div>
    )



}