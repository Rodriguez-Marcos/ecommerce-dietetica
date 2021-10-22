import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { validate } from '../Utils/ValidateUser'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import './CreateUser.css'
import useUser from '../Hooks/UseUser';
import { Form, Button } from 'react-bootstrap'
import createUserByGoogle from '../Utils/createUser/createUserByGoogle';
import createUser from '../Utils/createUser/createUser';
import NavBar from './NavBar';

function CreateUser() {
    const { isLogin, login } = useUser();


    const history = useHistory();
    useEffect(() => {
        if (isLogin) history.push('/');
    }, [isLogin, history])



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
            login(input.email, input.password)
        }
    }


    const responseGoogle = (response) => {
        createUserByGoogle(response.profileObj)
        if (response.profileObj !== undefined) {
            history.push('/')
        }
    }

    return (
        <div>
            <NavBar />
            <Form className="divuser">
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" type="text"
                        value={input.name}
                        name="name"
                        onChange={handlerUser} />
                    <Form.Text className="text-muted">
                        Nunca compartiremos su correo electrónico con nadie más.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" placeholder="Apellidos" value={input.lastname}
                        name="lastname" onChange={handlerUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={input.password}
                        name="password" onChange={handlerUser} />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" value={input.email}
                        name="email" onChange={handlerUser} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handelSubmit}>
                    Crear Cuenta
                </Button>

                <GoogleLogin
                    clientId="908895428836-4a919vmuc5gl4ao04i8cjpgmnjt58ks0.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
            </Form>
        </div>


    )
}

function mapStateToProps(state) {
    return { respuesta: state.reducerPablo.user }
}
function mapDispatchToProps(dispatch) {
    return { createUser: (value) => dispatch(createUser(value)) }
}

export default connect(mapStateToProps, null)(CreateUser)