import Client from '../models/Client.js';
import Clientbygoogle from '../models/Clientbygoogle.js';
const bcrypt = require('bcrypt');

export async function createClient(req, res) {
    let { name, lastname, email, password, address, phone } = req.body;
    password = await bcrypt.hash(password, 10);
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
        if (newClient) {
            return res.json({
                message: 'Client created successfully',
                data: newClient
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function getClients(req, res) {
    try{
    let clients = await Client.findAll()
    return res.status(200).send(clients)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteClient(req,res){
    const {id}=req.params
    try{
    let client = await Client.destroy({where: {id:id}})
    return res.json({
        message: 'Client deleted successfully',
        data: client
    })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}

export async function createClientGoogle(req,res){
    let {givenName, familyName , email, googleId} = req.body;
    googleId = await bcrypt.hash(googleId, 10);

    if(!givenName || !familyName || !email || !googleId)
    {return res.status(404).send('Faltan datos')}
    try {
        console.log(googleId)
        let clientbygoogle = await Clientbygoogle.create({
             givenName,
             familyName, 
             email, 
             googleId
        })
        res.status(200).send({
            message: 'user by google create',
           data: clientbygoogle})
    }catch (err) {
        console.error(err)
    }
}