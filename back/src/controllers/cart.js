import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export async function addToCart(req, res, next) {
    const id_client = req.id;
    const {
        id_products
    } = req.body;

    try {
        let cart = await Cart.findByPk(id_client)
        let products = await Product.findAll({where:{id: id_products}})
        await cart.addProduct(products)

        return res.json({
            message: 'Product added successfully',
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
export async function getCarts(req, res) {
    try {
        let carts = await Cart.findAll()
        return res.status(200).send(carts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}