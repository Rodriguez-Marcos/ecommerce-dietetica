import Order from '../models/Order.js';
import Product_Order from '../models/Product_Order.js';
import Product from '../models/Product.js';


export async function createOrder(req, res) {
    const { shippingAddress, id_client, products } = req.body;

    try {
        let newOrder = await Order.create({
            
            shippingAddress,
            id_client
        }, {
            fields: [ 'shippingAddress', 'id_client']
        }
        )
        let newOrderId = await Order.findOne({ where: { id_client: id_client }, attributes: ["id"], order:[["createDate","DESC"]], limit:1 })
        let promises = Promise.all(products.map(async product => {
            let quantity = await Product.findOne({where:{id:product.id}, attributes: ["stock","price"]})
            
            let newProduct_Order = await Product_Order.create({ total:product.quantity*quantity.dataValues.price,quantity: product.quantity, id_product: product.id, id_order: newOrderId.dataValues.id })
            
            let newQuantity = quantity.dataValues.stock-product.quantity
            await Product.update({stock:newQuantity},{where:{id:product.id}})
            return newProduct_Order
        }))
        let promisesResolved = await promises
        
        if (promisesResolved) {
            let totalValue = await Product_Order.sum('total', { where: { id_order: newOrderId.dataValues.id} })
            let updateOrder = await Order.update({ ammount: totalValue},{where: { id: newOrderId.dataValues.id}})
            return res.json({
                message: 'Order created successfully',
                data: updateOrder
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
    try {
        let orders = await Order.findAll({include:{model:Product_Order}})
        return res.status(200).send(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteOrder(req, res) {
    const { id } = req.params
    try {
        let order = await Order.destroy({ where: { id: id } })
        return res.json({
            message: 'Order deleted successfully',
            data: order
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function getOrderbyId(req, res) {
   let {id}=req.params
    try {
        let orders = await Order.findOne({ where: { id: id }, include: [{ model: Product}] })
        return res.status(200).send(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}