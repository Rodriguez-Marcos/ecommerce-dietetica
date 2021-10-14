import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';

export async function addToFavorite(req, res, next) {
    const id_client = req.id;
    const {
        id_products
    } = req.body;

    try {
        let favorite = await Favorite.findByPk(id_client)
        let products = await Product.findAll({where:{id: id_products}})
        await favorite.addProduct(products)

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

export async function removeFromFavorite(req, res, next) {
    const id_client = req.id;
    const {
        id_products
    } = req.body;

    try {
        let favorite = await Favorite.findByPk(id_client)
        let products = await Product.findAll({where:{id: id_products}})
        await favorite.removeProduct(products)

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
export async function getFavorite(req, res) {
    const id_client = req.id;
    try {
        let favorite = await Favorite.findAll({where: {id_client: id_client}, include:[{model:Product}]})
        return res.status(200).send(favorite)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}