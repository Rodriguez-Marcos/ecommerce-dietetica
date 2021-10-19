import React, { useEffect, useState, useContext } from 'react';
// import Styles from './payment.module.css'
import styles from './formbefore.module.css'
import NavBar from './NavBar';
import { getAddress, postAddress } from '../Actions';
// import emptycart from '../../Utils/emptycart';
import GoogleMaps from "simple-react-google-maps"
import { StyleSharp } from '@material-ui/icons';
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { DataContext } from "../Contexts/DataProvider"
import getCart from "../Utils/getCart";
import axios from 'axios'
import { useHistory } from "react-router";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import { decode } from "jsonwebtoken";
import AddressCard from './AddressCard';
export default function Pending(){
    const myStorage = window.localStorage;
    const value = useContext(DataContext)
  const [carrito, setCarrito] = value.carrito;
  const [total, setTotal] = value.total;
  const [menu, setMenu] = value.menu;
  const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

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
        errors.numero=
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
     

    let [input, setInput]=useState({
        calle: ' ',
        altura: ' ',
        barrio: ' ',
        otros: ' ',
        codigo: ' ',
        numero: ' ',
    })

    // function handleAdress(event) {
    //     setInput({
    //         ...input,
    //         [event.target.name]: event.target.value
    //     })
    // }
    const jwt = window.localStorage.jwt
    var client = decode(jwt)
    console.log(client)
    var id = client.id
    const dispatch = useDispatch();
    useEffect(() => {
      const jwt = myStorage.getItem("jwt")
        dispatch(getAddress(jwt,id))
    }, [])
    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.calle || !input.altura || !input.barrio || !input.otros || !input.codigo || !input.numero) { swal("Error", "Debe llenar todos los campos", "error") }
        else {
             const jwt = myStorage.getItem("jwt");
             dispatch(postAddress(input,jwt))
             swal("Creado", "Dirección cargada con éxito!", "success")}}


let { isLogin, token, comodin, addresses } = useSelector(state => state.reducerPablo)
             const cookies = new Cookies();
             

            
             useEffect(() => { }, [payment]);
             useEffect(()=>{
               getCart(token)
             },[comodin])
             const history = useHistory();
             async function handleCompra(event) {
               event.preventDefault();
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
                   window.location.replace(response.data);
                 })
                 .catch(function (error) {
                   console.log(error);
                 });
           
             }
             async function payment(token) {
               var data = JSON.stringify({
                 "payment": "mercadopago"
               });
           
               var config = {
                 method: 'post',
                 url: '/payment',
                 headers: {
                   'Authorization': 'Bearer ' + token,
                   'Content-Type': 'application/json'
                 },
                 data: data,
               };
           
               axios(config)
                 .then(function (response) {
                   return (JSON.stringify(response.data));
                 })
                 .catch(function (error) {
                   console.log(error);
                 });
             }
           
           
             useEffect(() => {
               if (isLogin) {
                 getCart(token);
               }
             }, [isLogin])

if(addresses.length>0){
  return (

    <div className={styles.main}>
    <NavBar/>
    {/* <div className={Styles.div}> */}
        {/* <div>
        <h1>Gracias Por tu compra Aguardamos tu pago nomas </h1>
        </div> */}

{/* 
    </div> */}

        <h1 className={styles.ultimo}>¡Último paso! </h1>
        <p className={styles.ultimo2}>Por favor seleccione: </p>
        <div >
        <div class="form-check form-check-inline">
        <div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
  <label class="form-check-label" for="exampleRadios2">
      Envío a domicilio:
    </label>
    </div>
    </div>
    <div className={styles.main}>
      {addresses && addresses?.map(address=>{
        return (
          <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
        <AddressCard address={address}/>
        </div>
      )})}
    </div>
       
       
       
          

        
</div>


            <div className={styles.google}>
            <div class="form-check">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
    <label class="form-check-label" for="exampleRadios1">
    Retiro en local:
      </label>
      </div>

            <br />
            
            
            <GoogleMaps
            apiKey={"AIzaSyA5BBX89Qj05Gc9VuJD2hvQAIAOsL9ujXA"}
            style={{height: "360px", width: "90%"}}
            zoom={15}
            center={{lat: -31.417233, lng: -64.183923}}
            // -31.417233, -64.183923
            markers={{lat: -31.417233, lng: -64.183923}} //optional
            />
            <br/>
            <h4>Seleccione una sucursal:</h4>
            <div >
                        <p className={styles.inputNames}></p>
                        {/* a medida que selecciona el usuario ve lo que selecciona */}
                        <select name="types"  className={styles.dropdown}>
                            <option>
                                Seleccionar
                            </option>
                            <option>1.Centro</option>
                         
                        </select>
                    </div>




            {/* <p>Dirección: Rivadavia 29. Plaza San Martin </p> */}
            <br/>
            <h4>Por favor seleccione fecha y horario que va a retirar:</h4>
            <Calendar></Calendar>
         
            </div>
            <br />
            
            <div class="d-grid gap-2 col-3 mx-auto">
            <div class="form-check form-check-inline">
         <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
      <label class="form-check-label" for="inlineCheckbox1">Quiero notificación vía mail de mi pedido</label>







          
            </div>
            <button type="button" class="btn btn-success" onClick={handleCompra}>Comprar</button>
            {/* <button class="btn btn-primary" color="green" type="button">Comprar</button> */}
      
            <button type="button" class="btn btn-dark" onClick={()=>{setMenu(true)}} >Volver al carrito</button>
           
            </div>


    </div>
)
}else{
    return (

        <div className={styles.main}>
        <NavBar/>
        {/* <div className={Styles.div}> */}
            {/* <div>
            <h1>Gracias Por tu compra Aguardamos tu pago nomas </h1>
            </div> */}

{/* 
        </div> */}

            <h1 className={styles.ultimo}>¡Último paso! </h1>
            <p className={styles.ultimo2}>Por favor seleccione: </p>
            <div className={styles.form}>
            <div class="form-check form-check-inline">
            <div class="form-check">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
      <label class="form-check-label" for="exampleRadios2">
          Envío a domicilio:
        </label>
        </div>
        </div>
              
    
            <form>
  <div class="form-row">
    <div class="form-group col-md-4">
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
                    <p className={styles.errorMsg}>{errors.calle}</p>
                    )}

      {/* <input type="text" class="form-control" name='calle' value={input.calle} onChange={handleAdress} ></input> */}
    </div>
  </div>
  <div class="form-group col-md-4">
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
                    <p className={styles.errorMsg}>{errors.altura}</p>
                    )}

{/* 
      <input type="text" class="form-control" name='altura' value={input.altura} onChange={handleAdress} ></input> */}
    </div>
  <div class="form-group col-md-4">
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
                    <p className={styles.errorMsg}>{errors.barrio}</p>
                    )}
      {/* <input type="text" class="form-control" name='barrio' value={input.barrio} onChange={handleAdress}  ></input> */}
    </div>
    <div class="form-group col-md-4">
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
                    <p className={styles.errorMsg}>{errors.otros}</p>
                    )}
      {/* <input type="text" class="form-control" name='otros' value={input.otros} onChange={handleAdress} ></input> */}
    </div>
    <div class="form-group col-md-4">
      <label for="inputZip">Código postal:</label>
      <input
                    type="text"
                    class="form-control"
                    name="codigo"
                    // a todos los input le pongo handleInput para que vaya al estado
                    onChange={handleInput}
                    required='required'
                    onFocus={onFocus}
                    value={input.codigo}
                    ></input>
                    {errors.codigo && touched.codigo && (
                    <p className={styles.errorMsg}>{errors.codigo}</p>
                    )}
      {/* <input type="text" class="form-control" name='codigo' value={input.codigo} onChange={handleAdress}  ></input> */}
    </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputCity">Número de contacto:</label>
      <input
                    type="text"
                    class="form-control"
                    name="numero"
                    // a todos los input le pongo handleInput para que vaya al estado
                    onChange={handleInput}
                    required='required'
                    onFocus={onFocus}
                    value={input.numero}
                    ></input>
                    {errors.numero && touched.numero && (
                    <p className={styles.errorMsg}>{errors.numero}</p>
                    )}
      {/* <input type="text" class="form-control" name='numero' value={input.numero} onChange={handleAdress} ></input> */}
    </div>
  </div>
  <br/>
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Cargar</button>
</form>
</div>


                <div className={styles.google}>
                <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
        <label class="form-check-label" for="exampleRadios1">
        Retiro en local:
          </label>
          </div>

                <br />
                
                
                <GoogleMaps
                apiKey={"AIzaSyA5BBX89Qj05Gc9VuJD2hvQAIAOsL9ujXA"}
                style={{height: "360px", width: "90%"}}
                zoom={15}
                center={{lat: -31.417233, lng: -64.183923}}
                // -31.417233, -64.183923
                markers={{lat: -31.417233, lng: -64.183923}} //optional
                />
                <br/>
                <h4>Seleccione una sucursal:</h4>
                <div >
                            <p className={styles.inputNames}></p>
                            {/* a medida que selecciona el usuario ve lo que selecciona */}
                            <select name="types"  className={styles.dropdown}>
                                <option>
                                    Seleccionar
                                </option>
                                <option>1.Centro</option>
                             
                            </select>
                        </div>




                {/* <p>Dirección: Rivadavia 29. Plaza San Martin </p> */}
                <br/>
                <h4>Por favor seleccione fecha y horario que va a retirar:</h4>
                <Calendar></Calendar>
             
                </div>
                <br />
                
                <div class="d-grid gap-2 col-3 mx-auto">
                <div class="form-check form-check-inline">
             <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
          <label class="form-check-label" for="inlineCheckbox1">Quiero notificación vía mail de mi pedido</label>







              
                </div>
                <button type="button" class="btn btn-success" onClick={handleCompra}>Comprar</button>
                {/* <button class="btn btn-primary" color="green" type="button">Comprar</button> */}
          
                <button type="button" class="btn btn-dark" onClick={()=>{setMenu(true)}} >Volver al carrito</button>
               
                </div>


        </div>
    )


                    }
}