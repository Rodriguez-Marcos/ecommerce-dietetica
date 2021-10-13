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
        dispatch({type:'LOADING', payload: true})
        dispatch({type:'ERROR', payload: false})
        loginService(username, password)
            .then(async jwt => {
                let id_products = [];
                cookies.get('trolley')?.map(x=>id_products.push({id:x.id,quantity: x.quantity}));
                console.log(jwt)
                myStorage.jwt = jwt;
                await postCarrito(jwt, id_products)
                .then(async (res)=>{
                    await getCart(jwt)
                }).catch((err)=>{console.error(err)})
                dispatch({type: 'LOGIN', payload: jwt})
                var isadmin = await decode(jwt)
                dispatch({type:'LOADING', payload: false})
                dispatch({type: 'SET_LOGIN_USER', payload: isadmin.isAdmin})
            })
                .catch(err => {dispatch({type:'LOADING', payload: false}); alert(err); console.error(err) })
        }, []);

        const loginGoogle = useCallback(async (res)=>{
            let id_products = [];
                cookies.get('trolley')?.map(x=>id_products.push({id:x.id,quantity: x.quantity}));
            myStorage.jwt = res.$b.id_token;
            const { googleId } = res.profileObj;
            await createUserByGoogle(googleId,res.$b.id_token)
            postCarrito(myStorage.jwt, id_products)
            .then(async (res) => {
                    await getCart(myStorage.jwt);
                }).catch((err)=>{console.error(err)})
                .then((response)=>{
                    dispatch({type: 'LOGIN', payload: myStorage.jwt});
                    dispatch({type:'LOADING', payload: false})
            })
            .catch ((err) => {
                alert('Algo salio mal'+'\nEse usuario ya fue registrado en nuestra plataforma, prueba iniciar sesion con contraseña');
                console.error(err);
                myStorage.jwt = '';
                dispatch({type:'LOADING', payload: false});
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