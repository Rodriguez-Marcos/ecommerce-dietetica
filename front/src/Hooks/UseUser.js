import { decode } from "jsonwebtoken";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import loginService from '../Utils/LoginService'
import postCarrito from "../Utils/postCarrito";
import Cookies from "universal-cookie";

const cookies = new Cookies();


export default function useUser() {
    const dispatch = useDispatch();
    let myStorage = window.localStorage;
    const login = useCallback((username, password) => {
        loginService(username, password)
            .then(jwt => {
                let id_products = [];
                cookies.get('trolley')?.map(x=>id_products.push(x.id));

                console.log('logueado con exito')
                myStorage.jwt = jwt;
                postCarrito(jwt,id_products)
                dispatch({type: 'LOGIN', payload: jwt})
            })
            .catch(err => { alert(err); console.error(err) })
        }, []);

        const loginGoogle = useCallback((res)=>{
            myStorage.jwt = res.$b.id_token;
            dispatch({type: 'LOGIN', payload: myStorage.jwt})
        })
        
        const logout = useCallback(() => {
            console.log('deslogueado con exito')
            myStorage.jwt = '';
        dispatch({type: 'LOGOUT'})
    }, []);
    return {
        login,
        loginGoogle,
        logout
    }
}