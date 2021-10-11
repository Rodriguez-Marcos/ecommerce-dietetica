import React from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';

export default function Failure(){

    return (
        <div>
        <NavBar/>
        <div className={Styles.div}>
            <h1>uhhh capo hubo un error con la compra Rey</h1>
        </div>
        </div>
    )



}