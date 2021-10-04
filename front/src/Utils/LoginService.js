const ENDPOINT = 'http://localhost:3001'

export default function loginService( username, password ) {
    return fetch(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}