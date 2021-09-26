import Order from '../models/Order.js';

export async function createOrder(req, res) {
    const { ammount, shippingAddress, createDate, status, id_client } = req.body;
    try {
        let newOrder = await Order.create({
            ammount, 
            shippingAddress, 
            createDate, 
            status, 
            id_client
        }, {
            fields: ['ammount', 'shippingAddress', 'createDate', 'status', 'id_client']
        }
        )
        if (newOrder) {
            return res.json({
                message: 'Order created successfully',
                data: newOrder
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