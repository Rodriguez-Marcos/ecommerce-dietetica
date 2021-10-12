import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Product_Cart from '../models/Product_Cart.js';
import Order from '../models/Order.js';
import Product_Order from '../models/Product_Order.js';
import Client from '../models/Client.js';

export async function addToCart(req, res, next) {
    const id_client = req.id;
    let productsArray =[];

    try {
        if (Array.isArray(req.body.products)) {// [{id:1,quantity:1}]
            productsArray=req.body.products
            let cart = await Cart.findOne({ where: { id_client: id_client } })
            let promises = Promise.all(productsArray.map(async product => {
                let productEx = await Product_Cart.findOne({ where: { id_cart: cart.dataValues.id, id_product: product.id } })
                let quantity = await Product.findOne({ where: { id: product.id }, attributes: ["stock", "price"] })
                if (quantity.dataValues.stock <= 0) { return ("producto no disponible por el momento") }
                if (!productEx) {
                    let newProduct_Cart = await Product_Cart.create({ total: product.quantity * quantity.dataValues.price, quantity: product.quantity, id_product: product.id, id_cart: cart.dataValues.id })
                    return newProduct_Cart
                } else {
                    let newProduct_Cart = await Product_Cart.update({
                        total: (productEx.dataValues.total) + (product.quantity * quantity.dataValues.price),
                        quantity: product.quantity
                    },
                        { where: { id_cart: cart.dataValues.id, id_product: product.id } })
                    return newProduct_Cart
                }
            }))
            let promisesResolved = await promises

            if (promisesResolved) {
                let totalValue = await Product_Cart.sum('total', { where: { id_cart: cart.dataValues.id } })
                await Cart.update({ totalAmount: totalValue }, { where: { id: cart.dataValues.id } })
                let updatedCart = await Cart.findOne({ where: { id_client: id_client }, include: [{ model: Product }] })
                return res.json({
                    message: 'Cart uploaded successfully',
                    data: updatedCart
                })
            }
        } else {
            var products = req.body.products;
            console.log(products)
            let cart = await Cart.findOne({ where: { id_client: id_client } })
            let productEx = await Product_Cart.findOne({ where: { id_cart: cart.dataValues.id, id_product: products.id } })
            let quantity = await Product.findOne({ where: { id: products.id }, attributes: ["stock", "price"] })
            if (quantity.dataValues.stock <= 0) { return ("producto no disponible por el momento") }
            if (!productEx) {
                var newProduct_Cart = await Product_Cart.create({ total: products.quantity * quantity.dataValues.price, quantity: products.quantity, id_product: products.id, id_cart: cart.dataValues.id })

            } else {
                var newProduct_Cart = await Product_Cart.update({
                    total: (productEx.dataValues.total) + (products.quantity * quantity.dataValues.price),
                    quantity: products.quantity
                },
                    { where: { id_cart: cart.dataValues.id, id_product: products.id } })
            }

            if (newProduct_Cart) {
                let totalValue = await Product_Cart.sum('total', { where: { id_cart: cart.dataValues.id } })
                await Cart.update({ totalAmount: totalValue }, { where: { id: cart.dataValues.id } })
                let updatedCart = await Cart.findOne({ where: { id_client: id_client }, include: [{ model: Product }] })
                return res.json({
                    message: 'Cart uploaded successfully',
                    data: updatedCart
                })
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

export async function removeFromCart(req, res, next) {
    const id_client = req.id;
    const {
        id_products
    } = req.body; { }

    try {
        let cart = await Cart.findByPk(id_client)
        let products = await Product.findAll({ where: { id: id_products } })
        await cart.removeProduct(products)

        return res.json({
            message: 'Product removed successfully',
            data: products
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function getCart(req, res) {
    const id_client = req.id;
    try {
        let cart = await Cart.findAll({ where: { id_client: id_client }, include: [{ model: Product }] })
        return res.status(200).send(cart)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}

export async function emptyCart(req, res, next) {
    const id_client = req.id
    var shippingAddress = "Direccion de prueba"
    try {
        let cart = await Cart.findOne({where:{ id_client: id_client}})
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

                let cart = await Cart.findByPk(id_client)
                console.log(cart)
                 let products = await Product.findAll() 
                await cart.removeProduct(products)
                await Cart.update({totalAmount:0},{where:{id_client:id_client}}) 
                

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