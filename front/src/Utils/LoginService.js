const ENDPOINT = 'http://localhost:3001'

export default function loginService(username, password) {
    return fetch(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            console.log(response)
            if (!response.ok)
                throw new Error('email o contraseña incorrecta');
               
            return response;
        })
}