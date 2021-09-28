import Client from '../models/Client.js';

export async function createClient(req, res) {
    const { name, lastname, email, password, address, phone } = req.body;
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