import React, { useState } from "react";
import NavBar from './NavBar'
import { postAddress } from "../Actions";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";



export default function Newaddress() {
    const myStorage = window.localStorage;
    const [errors, setErrors] = useState({});
    let { token } = useSelector(state => state.reducerPablo)
    let history = useHistory()
    let dispatch = useDispatch();
    const [touched, setTouched] = useState({});
    let [input, setInput] = useState({
        calle: ' ',
        altura: ' ',
        barrio: ' ',
        otros: ' ',
        codigo: ' ',
        numero: ' ',
    })

    function validateForm(input) {
        let errors = {};
        if (!input.calle) {
            errors.calle = "Escribe una calle";
        } else {
            errors.calle = "";
        }
        if (!input.altura) {
            errors.altura = "Escribe una altura";
        } else if (!/\d{1,2} - \d{1,2}/g.test(input.altura)) {
            errors.altura =
                "La altura deben ser un máximo de 6 dígitos";
        } else {
            errors.altura = "";
        }
        if (!input.barrio) {
            errors.barrio = "Escribe un barrio";
        } else {
            errors.barrio = "";
        }
        if (!input.otros) {
            errors.otros = "Escribe datos adicionales de dirección";
        } else {
            errors.otros = "";
        }
        if (!input.codigo) {
            errors.codigo = "Escribe un código postal";
        } else if (!/\d{1,2} - \d{1,2}/g.test(input.codigo)) {
            errors.codigo =
                "El código postal no debe ser mayor a 10 dígitos";
        } else {
            errors.codigo = "";
        }

        if (!input.numero) {
            errors.numero = "Escribe un número de teléfono";
        } else if (!/\d{1,2}-\d{1,2}/g.test(input.numero)) {
            errors.numero =
                "Escribe un teléfono con prefijo válido";
        } else {
            errors.numero = "";
        }

        return errors;
    };

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true,
        });
    }


    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.calle || !input.altura || !input.barrio || !input.otros || !input.codigo || !input.numero) { swal("Error", "Debe llenar todos los campos", "error") }
        else {
          const jwt = myStorage.getItem("jwt");
          console.log(jwt)
          dispatch(postAddress(input, jwt))
          swal("Creado", "Dirección cargada con éxito!", "success")
          window.location.href = '/envio'
        }
      }
    function handleClose() {
        history.push('/envio')
    }


    return (
        <div>

            <NavBar />
            <div>

                <form>
                    <div class="form-row">
                        <div>
                            <label for="inputCity">Calle:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="calle"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.calle}
                            ></input>
                            {errors.calle && touched.calle && (
                                <p>{errors.calle}</p>
                            )}

                            {/* <input type="text" class="form-control" name='calle' value={input.calle} onChange={handleAdress} ></input> */}
                        </div>
                        <div >
                            <label for="inputCity">Altura:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="altura"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.altura}
                            ></input>
                            {errors.altura && touched.altura && (
                                <p>{errors.altura}</p>
                            )}

                            {/* 
      <input type="text" class="form-control" name='altura' value={input.altura} onChange={handleAdress} ></input> */}
                        </div>
                        <div class="form-group col-xs-12">
                            <label for="inputCity">Barrio:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="barrio"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.barrio}
                            ></input>
                            {errors.barrio && touched.barrio && (
                                <p >{errors.barrio}</p>
                            )}
                            {/* <input type="text" class="form-control" name='barrio' value={input.barrio} onChange={handleAdress}  ></input> */}
                        </div>
                        <div class="form-group col-xs-12">
                            <label for="inputZip">Otros:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="otros"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.otros}
                            ></input>
                            {errors.otros && touched.otros && (
                                <p >{errors.otros}</p>
                            )}
                            {/* <input type="text" class="form-control" name='otros' value={input.otros} onChange={handleAdress} ></input> */}
                        </div>
                        <div class="form-group col-xs-12">
                            <label for="inputZip">Código postal:</label>
                            <input
                                type="number"
                                class="form-control"
                                name="codigo"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.codigo}
                            ></input>
                            {errors.codigo && touched.codigo && (
                                <p >{errors.codigo}</p>
                            )}
                            {/* <input type="text" class="form-control" name='codigo' value={input.codigo} onChange={handleAdress}  ></input> */}
                        </div>
                        <div class="form-group col-xs-12">
                            <label for="inputCity">Número de contacto:</label>
                            <input
                                type="number"
                                class="form-control"
                                name="numero"
                                // a todos los input le pongo handleInput para que vaya al estado
                                onChange={handleInput}
                                required='required'
                                onFocus={onFocus}
                                value={input.numero}
                            ></input>
                            {errors.numero && touched.numero && (
                                <p >{errors.numero}</p>
                            )}
                            {/* <input type="text" class="form-control" name='numero' value={input.numero} onChange={handleAdress} ></input> */}
                        </div>
                    </div>
                </form>

                <div> <button onClick={handleClose}>Cerrar </button>
                    <button onClick={handleSubmit}> Aceptar </button>
                </div>




            </div>
        </div>
    )
}