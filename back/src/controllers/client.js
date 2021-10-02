import Client from '../models/Client.js';
import Clientbygoogle from '../models/Clientbygoogle.js';

export async function createClient(req, res) {
    const { name, lastname, email, password, address, phone } = req.body;

    let dateBaseByClient = Client.findOne({where : {email : email}})
    

    try {
        if(!dateBaseByClient){
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
    }else {
       return res.send( 'Usuario ya creado' )
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
    if(!givenName || !familyName || !email || !googleId)
    {return res.status(404).send('Faltan datos')}
    try {
        let dateBaseByGoogle = Clientbygoogle.findAll()

        const checkin = dateBaseByGoogle.filter((value) =>( value.email === email))

        if(!checkin){

        let clientbygoogle = await Clientbygoogle.create({
             givenName,
             familyName, 
             email, 
             googleId
        })
        res.status(200).send({
            message: 'user by google create',
           data: clientbygoogle})
        }else {
            res.status(200).send('Usuario ya creado')
        }
    }catch (err) {
        console.error(err)
    }
}