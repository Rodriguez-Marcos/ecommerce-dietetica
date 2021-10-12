import React, { useEffect, useState } from 'react';
import Styles from './payment.module.css'
import NavBar from '../NavBar';
import { postAdress } from '../../Actions';
import emptycart from '../../Utils/emptycart';

export default function Pending(){

    let [input, setInput]=useState({
        direccion: ' ',
        altura: ' ',
        otros: ' ',
        ciudad: ' ',
        provincia: ' ',
        numero: ' ',
    })

    function handleAdress(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        emptycart(window.localStorage.jwt)
    }, [])
    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.direccion || !input.altura || !input.ciudad || !input.provincia || !input.numero) { alert('Debes llenar todos los campos') }
        else {
             postAdress(input) 
             alert('Gracias por confiar en nosotros')}}

    return (


        <div>
        <NavBar/>
        <div className={Styles.div}>
            <div>
            <h1>Gracias Por tu compra Aguardamos tu pago nomas </h1>
            </div>
          
        </div>
        <div>
            <h1> Solo nos queda cargar los datos del envio </h1>
                <p>Direccion</p>
                <input type="text" name='direccion' value={input.direccion} placeholder="Direccion" onChange={handleAdress} />
                <p>Altura</p>
                <input type="text" placeholder="Altura" name='altura' value={input.altura} onChange={handleAdress} />
                <p>Otros</p>
                <input type="text" placeholder="Otros" name='otros' value={input.otros} onChange={handleAdress} />
                <p>Ciudad</p>
                <input type="text" placeholder="Ciudad" name='ciudad' value={input.ciudad} onChange={handleAdress} />
                <p> Provincia </p>
                <input type="text" placeholder="Provincia" name='provincia' value={input.provincia} onChange={handleAdress} />
                <p>Numero de Contacto</p>
                <input type="text" placeholder="Numero de Contacto" name='numero' value={input.numero} onChange={handleAdress} />

                <button onClick={handleSubmit}> Aceptar </button>

            </div>
        </div>
    )



}