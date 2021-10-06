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

export async function removeFromCart(req, res, next) {
    const id_client = req.id;
    const {
        id_products
    } = req.body;

    try {
        let cart = await Cart.findByPk(id_client)
        let products = await Product.findAll({where:{id: id_products}})
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
        let cart = await Cart.findOne({where: {id_client: id_client}, include:[{model:Product}]})
        return res.status(200).send(cart)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}