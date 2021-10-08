import axios from "axios"
export default async function createUserByGoogle(payload) {
    await axios.post("http://localhost:3001/clients/bygoogle", payload)
        .then((response) => response)
        .catch((err) => console.error(err))

};