
import dotenv from "dotenv";
dotenv.config();
const ENDPOINT = 'http://localhost:3001'

export default function loginService(username, password) {
    return fetch(`${process.env.REACT_APP_API || ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            console.log(response)
            if (!response.ok)
                throw new Error('email o contraseña incorrecta');
               
            return response.text();
        })
}