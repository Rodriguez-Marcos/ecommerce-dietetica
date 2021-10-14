import axios from "axios"

export default async function createUser(payload) {
    await axios.post("https://ecommerce-dietetica.vercel.app/clients", payload)

};