import swal from "sweetalert";
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../Actions/index'
import './Login.css'
import { Form, Button } from 'react-bootstrap'
import useUser from '../Hooks/UseUser';
import NavBar from './NavBar';
import createUser from '../Utils/createUser/createUser';
import { validate } from '../Utils/ValidateUser';
import gif from './img/loading-25.gif'



function Login({ respuesta, isLogin }) {
    // VER RUTA
    useEffect(() => {
        if (isLogin) history.push('/');

    }, [isLogin])
    const dispatch = useDispatch();
    const [click, setClick] = useState(0)
    let { loading, error } = useSelector(state => state.loading)


    const [input, setInput] = useState({
        name: '',
        lastname: '',
        password: '',
        email: '',
        address: 'peru 30000',
        phone: '213124124',
    }
    )
    const [control, setControl] = useState({})
    const [account, setAccount] = useState(false)

    const { login, loginGoogle } = useUser();
    const history = useHistory();

    async function handleSubLoginCreate(event) {
        event.preventDefault()
        if (Object.keys(control).length|| !input.repeatPass) {
            swal('Revisa los campos')

        }
        else {
            dispatch({ type: 'LOADING', payload: true })
            try {
                let res = await createUser(input)
            }
            catch (err) { console.error(err) }

            await login(input.email, input.password)
            dispatch({ type: 'LOADING', payload: false })
            
        }
    }
    
    function handleSubLogin(event) {
        event.preventDefault()
        console.log(input.repeatPass)
        if (Object.keys(control).length) {
            swal('Revisa los campos')

        }
        else {

            login(input.email, input.password)

        }
    }
    function handleChange(event) {
        console.log(event.target.value)
        setControl({ ...validate({
                ...input,
                [event.target.name]: event.target.value
            },
            account
        )})

        setInput({
                ...input,
                [event.target.name]: event.target.value
            })
            
    }


    const responseGoogle = (response) => { }


    if (!account) {
        return (
            <div>
                <NavBar />
                <Form className="divuser" onSubmit={handleSubLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control key='Email' style={control.email?.length ? { color: 'red', borderColor: 'red' } : { color: 'black' }} placeholder="ejemplo@email.com" type="text" name="email" value={input.email} onChange={handleChange} />
                        <Form.Text key='email' style={control.email?.length ? { color: 'red' } : { color: 'black' }} className="text-muted">
                            {control.email || 'Nunca compartiremos su correo electrónico con nadie más.'}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control style={control.password?.length?{color: 'red', borderColor: 'red'}:{color: 'black'}} key='password' placeholder="Contraseña" type="password" name='password' value={input.password} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            {control.password || 'Escriba su contraseña'}
                        </Form.Text>
                    </Form.Group>
                    <Button className='btn' onClick={handleSubLogin}> Aceptar </Button>
                    <GoogleLogin
                        clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={loginGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <h6 className='registrarse' onClick={e => setAccount(true)}>No tienes una cuenta? <h6 >Registrate</h6></h6>
                </Form>
                {loading ? <img className='imagenCargando' src={gif}></img> : false}
            </div>

        )
    }
    else {
        return (
            <div>
                <NavBar />
                <Form className="divuser" onSubmit={handleSubLoginCreate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control style={control.name?.length ? { color: 'red', borderColor: 'red' } : { color: 'black' }} type="text" placeholder="Nombre" type="text"
                            value={input.name}
                            name="name"
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control style={control.lastname?.length ? { color: 'red', borderColor: 'red' } : { color: 'black' }} type="text" placeholder="Apellidos" value={input.lastname}
                            name="lastname" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control key='Email' style={control.email?.length ? { color: 'red', borderColor: 'red' } : { color: 'black' }} placeholder="ejemplo@email.com" type="text" name="email" value={input.email} onChange={handleChange} />
                        <Form.Text key='email' style={control.email?.length ? { color: 'red' } : { color: 'black' }} className="text-muted">
                            {control.email || 'Nunca compartiremos su correo electrónico con nadie más.'}
                        </Form.Text>
                    </Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                        <Form.Control style={control.password?.length?{ borderColor: 'red'}:{color: 'black'}} key='password' placeholder="Contraseña" type="password" name='password' value={input.password} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            {control.password || 'Escriba su contraseña'}
                        </Form.Text>
                            <br/>
                        <Form.Control style={control.repeatPass?.length?{ borderColor: 'red'}:{color: 'black'}} type="password" placeholder="repita su contraseña" value={input.repeatPass}
                            name="repeatPass" onChange={handleChange} />
                            <br/>
                    <Button className='btn' variant="primary" type="submit" onClick={handleSubLoginCreate}>
                        Crear Cuenta
                    </Button>

                    <GoogleLogin
                        clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={loginGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <h6 className='registrarse' onClick={e => setAccount(false)}>Ya tienes una cuenta? <h6 >Ingresa</h6></h6>
                </Form>
                {loading ? <img className='imagenCargando' src={gif}></img> : false}

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        isLogin: state.reducerPablo.isLogin,
    }
}

function mapDispatchToProps(dispatch) {
    return { loginUser: (email, password) => dispatch(loginUser(email, password)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
