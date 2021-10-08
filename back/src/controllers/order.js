import Order from '../models/Order.js';
import Product_Order from '../models/Product_Order.js';
import Product from '../models/Product.js';
import Client from '../models/Client.js';


export async function createOrder(req, res) {
    const id_client = req.id
    const { shippingAddress, products } = req.body;
    console.log(id_client)
    try {
        await Order.create({

            shippingAddress: shippingAddress,
            id_client: id_client
        }
        )
        let newOrderId = await Order.findOne({ where: { id_client: id_client }, attributes: ["id"], order: [["createDate", "DESC"]], limit: 1 })
        let promises = Promise.all(products.map(async product => {
            let quantity = await Product.findOne({ where: { id: product.id }, attributes: ["stock", "price"] })

            let newProduct_Order = await Product_Order.create({ total: product.quantity * quantity.dataValues.price, quantity: product.quantity, id_product: product.id, id_order: newOrderId.dataValues.id })

            let newQuantity = quantity.dataValues.stock - product.quantity
            await Product.update({ stock: newQuantity }, { where: { id: product.id } })
            return newProduct_Order
        }))
        let promisesResolved = await promises
        if (promisesResolved) {
            let totalValue = await Product_Order.sum('total', { where: { id_order: newOrderId.dataValues.id } })
            await Order.update({ ammount: totalValue }, { where: { id: newOrderId.dataValues.id } })
            let updatedOrder = await Order.findOne(
                {
                    where: { id_client: id_client },
                    attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
                    include: [
                        { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                        {
                            model: Product, attributes: ["id", "name", "price", "description"],
                            through: { attributes: ["quantity", "total"] }
                        }],
                    order: [["createDate", "DESC"]],
                    limit: 1
                })
            return res.json({
                message: 'Order created successfully',
                data: updatedOrder
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
    let { id_client, id_order } = req.query
    try {
        if (!id_client && !id_order) {
            var orders = await Order.findAll(
                {
                    attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
                    include: [
                        { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                        {
                            model: Product, attributes: ["id", "name", "price", "description"],
                            through: { attributes: ["quantity", "total"] }
                        }],
                    order: [["createDate", "DESC"]],
                })
        } else if (id_client && !id_order) {
            var orders = await Order.findAll({
                where: { id_client: id_client },
                attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
                include: [
                    { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                    {
                        model: Product, attributes: ["id", "name", "price", "description"],
                        through: { attributes: ["quantity", "total"] }
                    }],
                order: [["createDate", "DESC"]],

            })
        } else if (!id_client && id_order) {
            var orders = await Order.findOne({
                where: { id: id_order },
                attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
                include: [
                    { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                    {
                        model: Product, attributes: ["id", "name", "price", "description"],
                        through: { attributes: ["quantity", "total"] }
                    }],
            })
        }
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
export async function changeOrderStatus(req, res) {
    let { id } = req.params
    let { status } = req.body
    try {
        await Order.update({ status: status }, { where: { id: id } })
        let order = await Order.findOne({
            where: { id: id },
            attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
            include: [
                { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                {
                    model: Product, attributes: ["id", "name", "price", "description"],
                    through: { attributes: ["quantity", "total"] }
                }],
        })
        return res.status(200).send(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}
        })

    }
}