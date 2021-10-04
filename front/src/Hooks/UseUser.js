import { useCallback, useContext } from "react";
import Context from "../Contexts/UserContext";
import loginService from '../Utils/LoginService'


export default function useUser() {
    const { jwt, setJWT } = useContext(Context);

    const login = useCallback((username, password) => {
        console.log(username)
        loginService(username, password)
            .then(jwt => {
                console.log("jwt:", jwt)
                setJWT(jwt)
            })
            .catch(err => { alert(err); console.error(err) })
    }, [setJWT]);

    const logout = useCallback(() => {
        setJWT(null);
    }, [setJWT]);
    return {
        isLogin: Boolean(jwt),
        login,
        logout
    }
}