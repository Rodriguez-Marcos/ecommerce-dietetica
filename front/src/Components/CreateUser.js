
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { validate } from '../Utils/ValidateUser'
import { useHistory } from "react-router-dom";
import { createUser } from '../Actions/index';
import { connect } from 'react-redux';
import './CreateUser.css'
import { Form, Button } from 'react-bootstrap'

function CreateUser({ respuesta, createUser }) {

    const history = useHistory();


    async function createUser(payload) {
        await axios.post("http://localhost:3001/clients", payload)
            .then((response) => { console.log(response) })
            .catch((err) => console.error(err))

    };

    async function createUserByGoogle(payload) {
        await axios.post("http://localhost:3001/clients/bygoogle", payload)
            .then((response) => { console.log(response) })
            .catch((err) => console.error(err))
    };



    const [click, setClick] = useState(0)

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

            alert('Se creo usuario exitosamente')
            history.push('/home')
        }
    }

        
    useEffect(() => {
        
            if (respuesta.message === 'Usuario ya creado') {
                alert('Email ya registrado')
            }
            else if (respuesta.message === 'Client created successfully') {
                alert('Se creo usuario exitosamente')
                history.push('/home')
            }
            else {
                
            }
    

    }, [respuesta]
    )



    const responseGoogle = (response) => {
        console.log(response.profileObj);
        createUserByGoogle(response.profileObj)
        if (response.profileObj !== undefined) {
            history.push('/home')
        }
    }

    return (

        <Form className="divuser">
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" type="text"
                    value={input.name}
                    name="name"
                    onChange={handlerUser} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handelSubmit}>
                Crear Cuenta
            </Button>
            
            <GoogleLogin
                clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </Form>



    )
}

function mapStateToProps(state) {
    return { respuesta: state.reducerPablo.user }
}
function mapDispatchToProps(dispatch) {
    return { createUser: (value) => dispatch(createUser(value)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)