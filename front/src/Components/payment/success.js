import React, { useEffect } from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';
import emptyCart from '../../Utils/emptycart';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie'

export default function Success() {
    let cookies = new Cookies();
    let { token } = useSelector(state => state.reducerPablo)
    useEffect(() => {
        emptyCart(token)
    }, [cookies])

    return (
        <div>
            <NavBar />
            <div className={Styles.div}>
                <div>
                    <h1>Gracias Por tu compra</h1>
                </div>
            </div>
        </div>
    )



}