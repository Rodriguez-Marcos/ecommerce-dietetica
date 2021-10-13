import React, { useEffect, useState } from "react";
import axios from 'axios'
import NavBar from './NavBar'
import {postAdress} from "../Actions";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";



export default function Adress() {
    let { token } = useSelector(state => state.reducerPablo)
    let history = useHistory()

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

    /* useEffect(() => { }, [payment]) */

    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.direccion || !input.altura || !input.ciudad || !input.provincia || !input.numero) { alert('Debes llenar todos los campos') }
        else {
              postAdress(input) 
             alert('Gracias por confiar en nosotros')
            /* var data = JSON.stringify({
                "payment": "mercadopago"
            });

            var config = {
                method: 'post',
                url: 'http://localhost:3001/payment',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    window.location.replace(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                }); */

        }
    }

   /*  async function payment(token) {
        var data = JSON.stringify({
            "payment": "mercadopago"
        });

        var config = {
            method: 'post',
            url: 'http://localhost:3001/payment',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                return (JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    } */


    return (
        <div>

            <NavBar />
            <div>

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