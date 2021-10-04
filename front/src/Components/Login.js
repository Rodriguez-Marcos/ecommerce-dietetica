import React, {useEffect, useState} from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {loginUser} from '../Actions/index'
import './Login.css'


function Login({respuesta, loginUser}) {

    const history = useHistory();
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
           return loginUser(input.email, input.password)
        }
    }

    useEffect(() => {
        
            if (respuesta.message === 'User Login failed') {
                alert('Usuario no encontrado')
            }
            else if (respuesta.message === 'User Login') {
                alert('Se Inicio Sesion')
                history.push('/home')
            }
            else {}
        

    }, [respuesta]
    )
    

    

    const responseGoogle = (response) => {
       /*  createUserByGoogle(response.profileObj) */
    }

    return (
        <div className="divuser">
        
        <p>Email</p>
        <input type='text' name='email' value={input.email} onChange={handleEmail} />
        <p>Password</p>
        <input type='password' name='password' value={input.password} onChange={handleEmail} />
        <button onClick={handleSubmit}> Aceptar </button>
        


        
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
function mapStateToProps(state) {
    return { respuesta: state.reducerPablo.login_user,
    }
}

function mapDispatchToProps(dispatch) {
    return { loginUser: (email,password) => dispatch(loginUser(email,password)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)