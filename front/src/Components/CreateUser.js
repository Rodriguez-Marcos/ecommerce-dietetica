import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { validate } from '../Utils/ValidateUser';
import { useHistory } from "react-router-dom";
import { createUser } from '../Actions/index';
import { connect } from 'react-redux';
import './CreateUser.css'

 function CreateUser({respuesta,createUser}) {

    const history = useHistory();
    
    

    async function createUserByGoogle(payload) {
        await axios.post("http://localhost:3001/clients/bygoogle", payload)
            .then((response) => { console.log(response) })
            .catch((err) => console.error(err))

    };

    const [click,setClick] = useState(0)

    const [input, setInput] = useState({
        name: '',
        lastname: '',
        password: '',
        email: '',
        address: 'peru 30000',
        phone: '213124124',
    }
    )

    const [errors, setErrors] = useState({
        name: '',
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
        if (!input.name || !input.lastname || !input.password || !input.email) {
            alert('Debes llenar todos los campos')
        }
        else {
           createUser(input)
            setClick(click + 1)
          }
    }
        useEffect( () => {
            console.log(respuesta)
            if(respuesta === undefined){
                console.log('primera vuelta')
            }else { 
                if (respuesta === 'Usuario ya creado') {
                    alert('Email ya registrado')
                }
                else {
                    alert('Se creo usuario exitosamente')
                    history.push('/home')
                }}
           
        }, [click + 1] 
        )


    const responseGoogle = (response) => {
        console.log(response.profileObj);
        createUserByGoogle(response.profileObj)
        if (response.profileObj !== undefined) {
            history.push('/home')
        }
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

function mapStateToProps(state){
   return {respuesta: state.user}
}
function mapDispatchToProps(dispatch) {
    return {createUser:  (value)=> dispatch(createUser(value))}
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUser)