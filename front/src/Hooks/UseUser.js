import { decode } from "jsonwebtoken";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import loginService from '../Utils/LoginService'
import postCarrito from "../Utils/postCarrito";
import Cookies from "universal-cookie";
import createUserByGoogle from "../Utils/createUser/createUserByGoogle";
import getCart from "../Utils/getCart";

const cookies = new Cookies();


export default function useUser() {
    const dispatch = useDispatch();
    let myStorage = window.localStorage;
    const login = useCallback((username, password) => {
        loginService(username, password)
            .then(async jwt => {
                let id_products = [];
                cookies.get('trolley')?.map(x=>id_products.push({id:x.id,quantity: x.quantity}));
                console.log(jwt)
                myStorage.jwt = jwt;
                postCarrito(jwt, id_products)
                getCart(jwt)
                dispatch({type: 'LOGIN', payload: jwt})
            })
            .catch(err => { alert(err); console.error(err) })
        }, []);

        const loginGoogle = useCallback((res)=>{
            myStorage.jwt = res.$b.id_token;
            const { googleId } = res.profileObj;
            createUserByGoogle(googleId,res.$b.id_token)
            .then((response)=>{
                dispatch({type: 'LOGIN', payload: myStorage.jwt});
            })
            .catch ((err) => {
                alert('Algo salio mal'+'\nEse usuario ya fue registrado en nuestra plataforma, prueba iniciar sesion con contraseña');
                console.error(err);
                myStorage.jwt = '';
            })
        })
        
        const logout = useCallback(() => {
            console.log('deslogueado con exito')
            myStorage.jwt = '';
            cookies.set('trolley',[])
        dispatch({type: 'LOGOUT'})
    }, []);
    return {
        login,
        loginGoogle,
        logout
    }
}