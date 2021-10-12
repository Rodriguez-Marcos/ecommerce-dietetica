import React from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';

export default function Failure(){

    return (
        <div>
        <NavBar/>
        <div className={Styles.div}>
            <div>
            <h1>Algo Salio mal en la Compra</h1>
            </div>
        </div>
        </div>
    )



}