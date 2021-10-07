import Client from '../models/Client.js';
import Cart from '../models/Cart.js';
import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.export = Client;

export async function createClient(req, res) {
    let { name, lastname, email, password, address, phone,givenName, familyName, googleId } = req.body;
    if (!name || !lastname || !email || !password || !address || !phone)
        return res.status(401).json({error: 'faltan algunos campos'})

    if (!googleId){
    password = await bcrypt.hash(password,10);

    let dataBaseByClient = await Client.findOne({ where: { email: email } })

    if(!dataBaseByClient){
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

    }
} else {
        return res.json({ message: 'Usuario ya creado' })
    }
}else{
        if (!givenName || !familyName || !email) { return res.status(404).send('Faltan datos') }
        try {
            let dataBaseByGoogle = await Client.findOne({ where: { email: email } })
        
            if (!dataBaseByGoogle) {
                
                let newClient = await Client.create({
                     name:givenName,
                     lastname:familyName, 
                     email:email,
                     isGoogleClient: true, 
                     googleId:googleId

                })
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
        }}
    }catch (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Something goes Wrong',
                    data: {}
        
                })
    }
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
        await Cart.destroy({where:{id_client:id}})
        await Favorite.destroy({where:{id_client:id}, include:[{model:Product}]})
        await Client.destroy({ where: { id: id } })
        let clients = await Client.findAll()
        
        return res.json({
            message: 'Client deleted successfully',
            data: clients
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function updateClientToAdmin(req,res){
   let {id} = req.params
   try{
    let isAdmin = await Client.findOne({where: {id:id}, attribute:["isAdmin"]})
    if (isAdmin.dataValues.isAdmin===false){
    await Client.update({isAdmin:true},{where:{id:id}})
} else {await Client.update({isAdmin:false},{where:{id:id}})}
let user = await Client.findOne({where: {id:id}})
return res.json({
    message: 'Client deleted successfully',
    data: user
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
    let { email, password, googleId } = req.body
    if(!googleId){
    let dataBaseByClient = await Client.findOne({
        where: {
            email: email
        }
    })
    password = await bcrypt.compare(password, dataBaseByClient.password)
    try { 
        if (password) {
        let token = ''
        const {id} = dataBaseByClient
        const userToken = {id,email}
        token = jwt.sign(userToken, 'juanelmascapo' )
        return res.json({
            message: 'User Login',
            data: dataBaseByClient,
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
}else {
    let dataBaseByGoogle = await Client.findOne({ 
        where: { 
            email: email,
            googleId: googleId
         } })
         try {
            if (dataBaseByGoogle) {
                return res.json({
                    message: 'User Login',
                    data: dataBaseByGoogle,
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
}





