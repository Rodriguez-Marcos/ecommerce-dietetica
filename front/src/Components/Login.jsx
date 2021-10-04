import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useUser from "../Hooks/UseUser";



export default function Login() {
    const { isLogin, login } = useUser();
    const history = useHistory();

    const [state, setState ] = useState({
        username: '',
        password: ''
    })
    useEffect(()=>{
        if(isLogin)history.push('/home');
    },[isLogin])
    
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