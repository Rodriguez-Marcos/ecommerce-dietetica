import Client from '../models/Client.js';

export async function createClient(req, res) {
    const { name, lastname } = req.body;
    try {
        let newClient = await Client.create({
            name,
            lastname,
        }, {
            fields: ['name', 'lastname']
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