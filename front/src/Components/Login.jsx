import { useState } from "react";
import useUser from "../Hooks/UseUser";



export default function Login() {
    const { isLogin, login } = useUser();

    const [state, setState ] = useState({
        username: '',
        password: ''
    })
    
    function onSubmit(e){
    e.preventDefault();
    const {email, password} = state;
    const username = email;
    login(username, password);
    }
    
    function onChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value 
        })
    }
    return (
        <div style={{ marginTop: '100px' }}>
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <input placeholder='email' onChange={e=>onChange(e)} name='email' ></input>
                <input placeholder='name' onChange={e=>onChange(e)} name='name'></input>
                <input placeholder='lastname' onChange={e=>onChange(e)} name='lastname'></input>
                <input placeholder='password' onChange={e=>onChange(e)} name='password' type='password'></input>
                <button>Ingresar</button>
            </form>
        </div>
    )
}