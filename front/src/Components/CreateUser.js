import React, {useState} from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import {validate} from '../Utils/ValidateUser'
import { useHistory } from "react-router-dom";
import './CreateUser.css'

export default function CreateUser() {

    const history = useHistory();

   async function createUser(payload){
            await axios.post("http://localhost:3001/clients", payload)
            .then( (response) => {console.log(response)})
            .catch( (err) => console.error(err))

             };
    async function createUserByGoogle(payload){
        await axios.post("http://localhost:3001/clients/bygoogle", payload)
        .then( (response) => {console.log(response)})
        .catch( (err) => console.error(err))

         };
           


    const [input, setInput] = useState({
        name:'',
        lastname: '',
        password: '',
        email: '',
        address:'peru 30000',
        phone:'213124124',
    }
    )

    const [errors, setErrors] = useState({
        name:'',
        lastname: '',
        password: '',
        email: ''
    }
    )
    

    function handlerUser(event) {
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

        function handelSubmit(event) {
            event.preventDefault()
            if(!input.name || !input.lastname || !input.password || !input.email)
            {
                alert('Debes llenar todos los campos')
            }
            else{
                createUser(input)
                alert('Se creo usuario exitosamente')
                history.push('/home')
            }
        }


    const responseGoogle = (response) => {
        console.log(response.profileObj);
        createUserByGoogle(response.profileObj)
        if (response.profileObj !== undefined){
        history.push('/home')}
      }

    return (
        <div className="divuser">
        <p>Nombre</p>
        <input
              type="text"
              value={input.name}
              name="name"
              onChange={handlerUser}
            /> 
            
        <p>Apellido</p>
        <input
              type="text"
              value={input.lastname}
              name="lastname"
              onChange={handlerUser}
            /> 
            
        <p>Password</p>
        <input
              type="password"
              value={input.password}
              name="password"
              onChange={handlerUser}
            /> 
           
        <p>Email</p>
        <input
              type="text"
              value={input.email}
              name="email"
              onChange={handlerUser}
            /> 

        <button onClick={handelSubmit}> Crear cuenta </button>

      

        <GoogleLogin
        clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />,
        </div>
        )
}