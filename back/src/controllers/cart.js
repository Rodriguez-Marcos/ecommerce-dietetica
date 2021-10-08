import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Product_Cart from '../models/Product_Cart.js';

export async function addToCart(req, res, next) {
    const id_client = req.id;
    let { idproduct, productQuantity } = req.body


    try {
        let cart = await Cart.findOne({ where: { id_client: id_client } })
        let productEx = await Product_Cart.findOne({ where: { id_cart: cart.dataValues.id, id_product: idproduct } })
        let quantity = await Product.findOne({ where: { id: idproduct }, attributes: ["stock", "price"] })
        if (quantity.dataValues.stock <= 0) { return ("producto no disponible por el momento") }
        if (!productEx) {
            var newProduct_Cart = await Product_Cart.create({ total: productQuantity * quantity.dataValues.price, quantity: productQuantity, id_product: idproduct, id_cart: cart.dataValues.id })

        } else {
            var newProduct_Cart = await Product_Cart.update({
                total: (productEx.dataValues.total) + (productQuantity * quantity.dataValues.price),
                quantity: productEx.dataValues.quantity + productQuantity
            },
                { where: { id_cart: cart.dataValues.id, id_product: idproduct } })
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