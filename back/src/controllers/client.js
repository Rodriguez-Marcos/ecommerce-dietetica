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