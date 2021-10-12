import axios from "axios"

export default async function createUser(payload) {
    await axios.post("/clients", payload)
        .then((response) => { console.log(response) })
        .catch((err) => console.error(err))

};