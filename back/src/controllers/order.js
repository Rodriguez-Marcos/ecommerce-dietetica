import Order from '../models/Order.js';
import Product_Order from '../models/Product_Order.js';
import Product from '../models/Product.js';
import Client from '../models/Client.js';
import Product_Cart from '../models/Product_Cart.js'
import Cart from '../models/Cart.js';
const nodemailer = require('nodemailer');

export async function createOrder(req, res) {
    const id_client = req.id
    var shippingAddress = "Direccion de prueba"
    try {
        let cart = await Cart.findOne({ where: { id_client: id_client } })
        let products = await Product_Cart.findAll({ where: { id_cart: cart.dataValues.id }, attributes: ["id_product", "quantity"] })
        console.log(products)

        await Order.create({

            shippingAddress: shippingAddress,
            id_client: id_client
        }
        )
        let newOrderId = await Order.findOne({ where: { id_client: id_client }, attributes: ["id"], order: [["createDate", "DESC"]], limit: 1 })
        let promises = Promise.all(products.map(async productOrder => {
            let quantity = await Product.findOne({ where: { id: productOrder.id_product }, attributes: ["stock", "price"] })

            let newProduct_Order = await Product_Order.create({ total: productOrder.quantity * quantity.dataValues.price, quantity: productOrder.quantity, id_product: productOrder.id_product, id_order: newOrderId.dataValues.id })

            let newQuantity = quantity.dataValues.stock - productOrder.quantity
            await Product.update({ stock: newQuantity }, { where: { id: productOrder.id_product } })
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
                let client = await Client.findOne({where:{id:id_client}})
                let clientMail = client.dataValues.email
            const transporter = nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'faridsesin@gmail.com',
                    pass: 'G76d8KXDCzjT4Ew0'
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const info = await transporter.sendMail({
                from: "'Salvatore' <faridsesin@gmail.com>",
                to: clientMail,
                subject: 'Tu pedido ha sido creado con exito',
                html: `
                    <h1>GRACIAS POR TU COMPRA</h1>
                    <h2>Te damos la bienvenida a Salvatore</h2>
                    <p> Tu pedido fue creado con exito. Enseguida tengamos tus productos listos te avisaremos</p>`,
            })
            console.log('Message sent', info.messageId)
            
            return res.redirect ('http://localhost:3001/cart/emptycart')
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
    let { id_client, id_order, status } = req.query
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

        if (status) {
            let ordersFilter = orders.filter(order => order.dataValues.status === status)
            return res.status(200).send(ordersFilter)
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
