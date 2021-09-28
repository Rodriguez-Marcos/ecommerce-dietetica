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
export async function getOrders(req, res) {
    try{
    let orders = await Order.findAll()
    return res.status(200).send(orders)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteOrder(req,res){
    const {id}=req.params
    try{
    let order = await Order.destroy({where: {id:id}})
    return res.json({
        message: 'Order deleted successfully',
        data: order
    })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}