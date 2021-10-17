import React, { useEffect, useState } from 'react';
// import Styles from './payment.module.css'
import styles from './pending.module.css'
import NavBar from '../NavBar';
// import { postAdress } from '../../Actions';
import emptycart from '../../Utils/emptycart';
import GoogleMaps from "simple-react-google-maps"
import { StyleSharp } from '@material-ui/icons';
import swal from "sweetalert";

export default function Pending(){
    const myStorage = window.localStorage;


    let [input, setInput]=useState({
        calle: ' ',
        altura: ' ',
        barrio: ' ',
        otros: ' ',
        codigo: ' ',
        numero: ' ',
    })

    function handleAdress(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        emptycart(myStorage.getItem('jwt'))
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        if (!input.calle || !input.altura || !input.barrio || !input.otros || !input.codigo || !input.numero) { swal("Error", "Debe llenar todos los campos", "error") }
        else {
             //postAdress(input) 
             swal("Creado", "Dirección cargada con éxito!", "success")}}

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
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
      <label class="form-check-label" for="inlineCheckbox1">Envío a domicilio:</label>
      </div>
            <form>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputEmail4">Calle:</label>
      <input type="text" class="form-control" name='calle' value={input.calle} onChange={handleAdress} ></input>
    </div>
  </div>
  <div class="form-group col-md-4">
      <label for="inputCity">Altura:</label>
      <input type="text" class="form-control" name='altura' value={input.altura} onChange={handleAdress} ></input>
    </div>
  <div class="form-group col-md-4">
      <label for="inputCity">Barrio:</label>
      <input type="text" class="form-control" name='barrio' value={input.barrio} onChange={handleAdress}  ></input>
    </div>
    <div class="form-group col-md-4">
      <label for="inputZip">Otros:</label>
      <input type="text" class="form-control" name='otros' value={input.otros} onChange={handleAdress} ></input>
    </div>
    <div class="form-group col-md-4">
      <label for="inputZip">Código postal:</label>
      <input type="text" class="form-control" name='codigo' value={input.codigo} onChange={handleAdress}  ></input>
    </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputCity">Número de contacto:</label>
      <input type="text" class="form-control" name='numero' value={input.numero} onChange={handleAdress} ></input>
    </div>
  </div>
  <br/>
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Cargar</button>
</form>
</div>






                <div className={styles.google}>
                    
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
                <label class="form-check-label" for="inlineCheckbox1">Retiro en local:</label>
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
                <p>Dirección: Rivadavia 29. Plaza San Martin </p>
             
                </div>
                <br />
                
                <div class="d-grid gap-2 col-3 mx-auto">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                <label class="form-check-label" for="gridCheck">
                Quiero notificación vía mail de mi pedido
                </label>
                </div>
                <button type="button" class="btn btn-success">Comprar</button>
                {/* <button class="btn btn-primary" color="green" type="button">Comprar</button> */}
                <button type="button" class="btn btn-dark">Volver al carrito</button>
               
                </div>


        </div>
    )



}


// <div className={styles.form}>
// <div class="form-check form-check-inline">
//      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
//      <label class="form-check-label" for="inlineCheckbox1">Envío a domicilio:</label>
//      </div>
//  {/* <h2>Datos de envío: </h2> */}
//      <p>Direccion</p>
     
//      <input class="form-control" type="text" name='direccion' value={input.direccion} placeholder="type" readonly onChange={handleAdress}></input>
//      {/* <input type="text" name='direccion' value={input.direccion} placeholder="Direccion" onChange={handleAdress} /> */}
//      <p>Altura</p>
//      <input type="text" placeholder="Altura" name='altura' value={input.altura} onChange={handleAdress} />
//      <p>Otros</p>
//      <input type="text" placeholder="Otros" name='otros' value={input.otros} onChange={handleAdress} />
//      <p>Ciudad</p>
//      <input type="text" placeholder="Ciudad" name='ciudad' value={input.ciudad} onChange={handleAdress} />
//      <p> Provincia </p>
//      <input type="text" placeholder="Provincia" name='provincia' value={input.provincia} onChange={handleAdress} />
//      <p>Numero de Contacto</p>
//      <input type="text" placeholder="Numero de Contacto" name='numero' value={input.numero} onChange={handleAdress} />
//      <br/>
//      <button onClick={handleSubmit}> Cargar </button>
//      <br /><br /><br />
     
//      </div> 