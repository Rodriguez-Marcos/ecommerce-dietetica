import React, { useState } from "react";
import NavBar from './NavBar'
import {postAddress} from "../Actions"; 
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";



export default function Newaddress() {
    let { token } = useSelector(state => state.reducerPablo)
    let history = useHistory()
    let dispatch = useDispatch();

    let [input, setInput]=useState({
        calle: ' ',
        altura: ' ',
        barrio: ' ',
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


    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.calle || !input.altura || !input.barrio || !input.ciudad || !input.provincia || !input.numero) { alert('Debes llenar todos los campos') }
        else {
            dispatch(postAddress(input,token))
             alert('Gracias por confiar en nosotros')
              history.push('/envio')
        }
    }
    function handleClose(){
        history.push('/envio')
    }


    return (
        <div>

            <NavBar />
            <div>

                <p>Direccion</p>
                <input type="text" name='calle' value={input.calle} placeholder="Direccion" onChange={handleAdress} />
                <p>Altura</p>
                <input type="text" placeholder="Altura" name='altura' value={input.altura} onChange={handleAdress} />
                <p>Barrio</p>
                <input type="text" placeholder="Barrio" name='barrio' value={input.barrio} onChange={handleAdress} />
                <p>Otros</p>
                <input type="text" placeholder="Otros" name='otros' value={input.otros} onChange={handleAdress} />
                <p>Ciudad</p>
                <input type="text" placeholder="Ciudad" name='ciudad' value={input.ciudad} onChange={handleAdress} />
                <p> Provincia </p>
                <input type="text" placeholder="Provincia" name='provincia' value={input.provincia} onChange={handleAdress} />
                <p>Numero de Contacto</p>
                <input type="text" placeholder="Numero de Contacto" name='numero' value={input.numero} onChange={handleAdress} />
               
               <div> <button onClick={handleClose}>Cerrar </button> 
               <button onClick={handleSubmit}> Aceptar </button>
               </div>
                

               

            </div>
        </div>
    )
}