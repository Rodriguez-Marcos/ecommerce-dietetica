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
        if (isLogin) history.push('/home');
    
    }, [isLogin])
    const dispatch = useDispatch();
    const [click, setClick] = useState(0)
    let { loading, error } = useSelector(state=>state.loading)

    
    const [input, setInput] = useState({
        name: '',
        lastname: '',
        password: '',
        email: '',
        address: 'peru 30000',
        phone: '213124124',
    }
    )
    const [control,setControl] = useState(input)
    const [account, setAccount] = useState(false)

    const { login, loginGoogle } = useUser();
    const history = useHistory();
    
    async function handelSubmit(event) {
        event.preventDefault()
        if (!input.name || !input.lastname || !input.password || !input.email) {
            alert('Debes llenar todos los campos')
        }
        else {
            dispatch({type:'LOADING', payload: true})
            try{
            let res = await createUser(input)
            console.log(res)
            }
            catch(err){console.error(err)}

            await login(input.email, input.password)
            dispatch({type:'LOADING', payload: false})

        }
    }

    function handleChange(event) {
        setControl(validate(input))
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        console.log('control: ',control)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (!input.password || !input.email) {
            alert('Debes llenar todos los campos')
        }
        else {
            
            login(input.email, input.password)

        }
    }

    const responseGoogle = (response) => {}
    

    if (!account) {
        return (
            <div>
                <NavBar />
                <Form className="divuser">
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="ejemplo@email.com" type="text" name="email" value={input.email} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Nunca compartiremos su correo electrónico con nadie más.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control placeholder="Contraseña" type="password" name='password' value={input.password} onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Escriba su contraseña registrada
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={handleSubmit}> Aceptar </Button>
                    <GoogleLogin
                        clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={loginGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <h6 onClick={e => setAccount(true)}>No tienes una cuenta? <h6 >Registrate</h6></h6>
                </Form>
            {loading?<img className='imagenCargando' src={gif}></img>:false}
            </div>

        )
    }
    else {
        return (
            <div>
                <NavBar />
                <Form className="divuser">
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" type="text"
                            value={input.name}
                            name="name"
                            onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Nunca compartiremos su correo electrónico con nadie más.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" placeholder="Apellidos" value={input.lastname}
                            name="lastname" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={input.password}
                            name="password" onChange={handleChange} />
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" value={input.email}
                            name="email" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handelSubmit}>
                        Crear Cuenta
                    </Button>

                    <GoogleLogin
                        clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={loginGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,
                    <h6 onClick={e => setAccount(false)}>ya tienes una cuenta? <h6 >Ingresa</h6></h6>
                </Form>
            {loading?<img className='imagenCargando' src={gif}></img>:false}

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
