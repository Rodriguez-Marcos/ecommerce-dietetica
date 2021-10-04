import { useCallback, useContext } from "react";
import Context from "../Contexts/UserContext";
import loginService from '../Utils/LoginService'


export default function useUser() {
    const { jwt, setJWT } = useContext(Context);

    const login = useCallback((username,password) => {
        loginService(username,password)
        .then(jwt=>{
            setJWT(jwt)
        })
        .catch(err=>console.error(err))
    },[setJWT]);

    const logout = useCallback(()=>{
        setJWT(null);
    },[setJWT]);
    return {
        isLogin: Boolean(jwt),
        login,
        logout
    }
}