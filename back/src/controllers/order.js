import Order from '../models/Order.js';
import Product_Order from '../models/Product_Order.js';
import Product from '../models/Product.js';
import Client from '../models/Client.js';
import Product_Cart from '../models/Product_Cart.js'
import Cart from '../models/Cart.js';
import { sequelize } from '../database/db.js'
import Address from '../models/Address.js';
const nodemailer = require('nodemailer');

export async function createOrder(req, res, next) {
    const id_client = req.id
    try {
        let cart = await Cart.findOne({ where: { id_client: id_client } })
        res.redirect('http://localhost:3001/cart/emptycart')
        let products = await Product_Cart.findAll({ where: { id_cart: cart.dataValues.id }, attributes: ["id_product", "quantity"] })
        console.log(products)

        await Order.create({

            id_client: id_client,
            shippingAddress: cart.dataValues.id_address,
            id_store: cart.dataValues.id_store
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
            var order = await Order.findOne(
                {
                    where: { id_client: id_client },
                    attributes: ["id", "ammount", "createDate", "status","shippingAddress","id_store"],
                    include: [
                        { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
                        { model: Address, attributes: ["id"] },
                        {
                            model: Product, attributes: ["id", "name", "price", "description"],
                            through: { attributes: ["quantity", "total"] }
                        }],
                    order: [["createDate", "DESC"]],
                    limit: 1
                })
            let client = await Client.findOne({ where: { id: id_client } })
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
            if (order.dataValues.shippingAddress !== null) {
                let address = await Address.findOne({ where: { id: order.dataValues.shippingAddress } })
                const info = await transporter.sendMail({
                    from: "'Salvatore' <faridsesin@gmail.com>",
                    to: clientMail,
                    subject: 'Tu pedido ha sido creado con exito',
                    html: `
                    <h1>GRACIAS POR TU COMPRA</h1>
                    <h2>Hola ${client.dataValues.name} ${client.dataValues.lastname} </h2>
                    <p> Estamos procesando tu pedido y te enviaremos un correo enseguida tu pedido sea despachado</p>
                    
                    <p>La direccion de envio es:</p>
                    <ul>
                    <li>Calle:${address.dataValues.calle}</li>
                    <li>Altura:${address.dataValues.altura}</li>
                    <li>Barrio:${address.dataValues.barrio}</li>
                    <li>Otros:${address.dataValues.otros}</li>
                    <li>Codigo:${address.dataValues.codigo}</li>
                    
                    </ul>
                    
                    
                    
                    
                    `,
                })
                console.log('Message sent', info.messageId)
            }
            if (order.dataValues.id_store !== null) {
                const info = await transporter.sendMail({
                    from: "'Salvatore' <faridsesin@gmail.com>",
                    to: clientMail,
                    subject: 'Tu pedido ha sido creado con exito',
                    html: `
                        <h1>GRACIAS POR TU COMPRA</h1>
                        <h2>Hola ${client.dataValues.name} ${client.dataValues.lastname} </h2>
                        <p> Estamos procesando tu pedido y te esperamos para que recojas tus productos</p>`,
                })
                console.log('Message sent', info.messageId)
            }

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
    id_client = req.id;
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

export async function bestSellers(req, res) {
    try {

        let productsQuantity = await Product_Order.findAll({
            group: ['id_product'],
            attributes: ['id_product',
                [sequelize.fn('SUM', sequelize.col('quantity')),
                    'productQuantity'],
                [sequelize.literal(`(
                              SELECT name
                              FROM products
                              WHERE products.id = products_order.id_product
                              
                            )`),
                    'name',
                ]],
            order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
            limit: 7

        })
        res.status(200).json({
            message: 'Products counted',
            data: productsQuantity
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}
        })
    }
}

export async function totalOrderByDay(req, res) {
    try {

        let totalByDay = await Order.findAll({
            group: [sequelize.fn('date_trunc', 'day', sequelize.col('createDate')), 'createdDay'],
            attributes: [[sequelize.fn('date_trunc', 'day', sequelize.col('createDate')), 'createdDay'],
            [sequelize.fn('SUM', sequelize.col('ammount')), 'total'
            ]],
            //limit:7 

        })
        res.status(200).json({
            message: 'Ammounts counted',
            data: totalByDay
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}
        })
    }

}
