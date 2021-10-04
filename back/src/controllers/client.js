import Client from '../models/Client.js';
import Clientbygoogle from '../models/Clientbygoogle.js';
import Cart from '../models/Cart.js';
import Favorite from '../models/Favorite.js';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export async function createClient(req, res) {
    let { name, lastname, email, password, address, phone } = req.body;

    password = await bcrypt.hash(password,10);

    let dateBaseByClient = await Client.findOne({ where: { email: email } })

    if(!dateBaseByClient){
    try {
        let newClient = await Client.create({
            name, 
            lastname, 
            email, 
            password, 
            address, 
            phone
        }, {
            fields: ['name', 'lastname', 'email', 'password', 'address', 'phone']
        }
        )
        let token = ''
        const {id} = newClient
        const userToken = {id,email}
        token = jwt.sign(userToken, 'juanelmascapo' )

        if (newClient) {
            let client_id = await Client.findOne({where: {name: newClient.name},attributes:['id']})
            await Cart.create({
                id_client: client_id.dataValues.id
            })
            await Favorite.create({
                id_client: client_id.dataValues.id
            })
            return res.json({
                message: 'Client created successfully',
                data: newClient,
                token
            })

        } else {
            return res.json({ message: 'Usuario ya creado' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }} else {
        return res.json({ message: 'Usuario ya creado' })
    }
}
export async function getClients(req, res) {
    try {
        let clients = await Client.findAll()
        return res.status(200).send(clients)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteClient(req, res) {
    const { id } = req.params
    try {
        let client = await Client.destroy({ where: { id: id } })
        return res.json({
            message: 'Client deleted successfully',
            data: client
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}

export async function loginUser(req, res) {
    let { email, password } = req.query
    let dateBaseByClient = await Client.findOne({
        where: {
            email: email
        }
    })
    password = await bcrypt.compare(password, dateBaseByClient.password)
    try { if (password) {
        let token = ''
        const {id} = dateBaseByClient
        const userToken = {id,email}
        token = jwt.sign(userToken, 'juanelmascapo' )
        return res.json({
            message: 'User Login',
            data: dateBaseByClient,
            token
        })
    } else {
        return res.json({
            message: 'User Login failed',
        })
    }
} catch (err) {
    res.status(404).send(err)
    console.log(err)
}
}

export async function loginBygoogle (req,res){
let {googleId,email} = req.body;
let dateBaseByGoogle = await Clientbygoogle.findOne({ 
    where: { 
        email: email,
        googleId: googleId
     } })
     try {
        if (dateBaseByGoogle) {
            return res.json({
                message: 'User Login',
                data: dateBaseByGoogle,
            })
        } else {
            return res.json({
                message: 'User Login failed'
            })
        }
    } catch (err) {
        res.status(404).send(err)
        console.log(err)
    }
}



export async function createClientGoogle(req, res) {
let { givenName, familyName, email, googleId } = req.body;
if (!givenName || !familyName || !email || !googleId) { return res.status(404).send('Faltan datos') }
try {
    let dateBaseByGoogle = await Clientbygoogle.findOne({ where: { email: email } })

    if (!dateBaseByGoogle) {
        console.log(googleId)
        let newClient = await Clientbygoogle.create({
             givenName,
             familyName, 
             email, 
             googleId
        })
        if (newClient) {
            let client_id = await Clientbygoogle.findOne({where: {givenName: newClient.givenName},attributes:['googleId']})
            console.log(client_id)
            await Cart.create({
                id_clientGoogle: client_id.dataValues.googleId
            })
            await Favorite.create({
                id_clientGoogle: client_id.dataValues.googleId
            })
            return res.status(200).send({
                message: 'user by google create',
               data: newClient})
        }
        

    }}catch (err) {

        console.error(err)
    }
}

