import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";


export default function Login() {

    [input, setInput] = useState({
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
            loginUser(input)
            history.push('/home')
        }
    }
    

    

    const responseGoogle = (response) => {
        createUserByGoogle(response.profileObj)
    }

    return (
        <div>
        <div>
        <p>Email</p>
        <input type='text' name='email' value={input.mail} onChange={handleEmail} />
        <p>Password</p>
        <input type='password' name='password' value={input.password} onChange={handleEmail} />
        <button onClick={handleSubmit}/>
        </div>
        


        <div>
            <GoogleLogin
                clientId="908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </div>
        </div>

    )
}
