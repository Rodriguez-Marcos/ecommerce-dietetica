import React, {useEffect, useState} from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {loginUser} from '../Actions/index'
import './Login.css'
import {Form, Button} from 'react-bootstrap'
import useUser from '../Hooks/UseUser';




function Login({respuesta, loginUser, isLogin}) {
    
    const { login, loginGoogle } = useUser();
    const history = useHistory();

    const [state, setState ] = useState({
        username: '',
        password: ''
    })
    useEffect(()=>{
        if(isLogin)history.push('/home');
        
    },[isLogin])

    const [input, setInput] = useState({
        email: '',
        password:'',
    });

    function handleEmail (event){
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (  !input.password || !input.email) {
            alert('Debes llenar todos los campos')
        }
        else{
            console.log('estoy aca')
            login(input.email,input.password)

        }
    }

    useEffect(() => {
        
            if (respuesta.message === 'User Login failed') {
                alert('Usuario no encontrado')
            }
            else if (respuesta.message === 'User Login') {
            }
            else {}
        

    }, [respuesta]
    )
    

    

    const responseGoogle = (response) => {

    }

    return (
        <Form className="divuser">
        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Email</Form.Label>
            <Form.Control  placeholder="ejemplo@email.com" type="text" name="email" value={input.email} onChange={handleEmail}/>
            <Form.Text className="text-muted">
                Nunca compartiremos su correo electrónico con nadie más.
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control  placeholder="Contraseña" type="password" name='password' value={input.password} onChange={handleEmail}/>
            <Form.Text className="text-muted">
                Escriba su contraseña registrada
            </Form.Text>
        </Form.Group>
        <Button onClick={handleSubmit}> Aceptar </Button>
        
        {/* <p>Email</p>
        <input type='text' name='email' value={input.email} onChange={handleEmail} />
        <p>Password</p>
        <input type='password' name='password' value={input.password} onChange={handleEmail} />
        <button onClick={handleSubmit}> Aceptar </button>
         */}


        
            <GoogleLogin
                clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={loginGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
    
        </Form>

    )
}
function mapStateToProps(state) {
    return { respuesta: state.reducerPablo.login_user,
        isLogin: state.reducerPablo.isLogin,
    }
}

function mapDispatchToProps(dispatch) {
    return { loginUser: (email,password) => dispatch(loginUser(email,password)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)