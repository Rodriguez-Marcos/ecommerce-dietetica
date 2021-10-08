import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Product_Cart from '../models/Product_Cart.js';

export async function addToCart(req, res, next) {
    const id_client = req.id;
    let products= [];
    if(!Array.isArray(req.body.products))
        products.push(req.body.products)
    else products = req.body.products;
    console.log("products",req.body.products)
    console.log(id_client)

    try {
        let cart = await Cart.findOne({ where: { id_client: id_client } })
        console.log(cart)
        let promises = Promise.all(products.map(async product => {
            let productEx = await Product_Cart.findOne({ where: { id_cart: cart.dataValues.id, id_product: product.id } })
            let quantity = await Product.findOne({ where: { id: product.id }, attributes: ["stock", "price"] })
            if (quantity.dataValues.stock <= 0) { return ("producto no disponible por el momento") }
            if (!productEx) {
                let newProduct_Cart = await Product_Cart.findOrCreate({ total: product.quantity * quantity.dataValues.price, quantity: product.quantity, id_product: product.id, id_cart: cart.dataValues.id })
                return newProduct_Cart
            } else {
                let newProduct_Cart = await Product_Cart.update({
                    total: (productEx.dataValues.total) + (product.quantity * quantity.dataValues.price),
                    quantity: productEx.dataValues.quantity + product.quantity
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
    } = req.body;{}

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