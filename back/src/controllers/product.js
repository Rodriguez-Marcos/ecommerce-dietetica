import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Diet from '../models/Diet.js';
import Category from '../models/Category.js';
import { Sequelize } from 'sequelize';

export async function createProduct(req, res) {
    const { name, price, description, image, stock } = req.body;
    try {
        let newProduct = await Product.create({
            name,
            price,
            description,
            image,
            stock,
        }, {
            fields: ['name', 'price', 'description', 'image', 'stock']
        }
        )
        if (newProduct) {
            return res.json({
                message: 'Product created successfully',
                data: newProduct
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





export async function getProducts(req, res) {
    let { name, id_category, id_diet } = req.query
    try {
        if (!id_category && !name && !id_diet) {

            let products = await Product.findAll()
            return res.status(200).send(products)
        }
        else {
            if (name) {
            

                const filterproducts = await Product.findAll({
                    where: {
                        name: { [Sequelize.Op.iLike]: `%${name}%` }
                    }
                })
                return res.status(200).json(filterproducts)
            } else {
                if (id_category && id_diet) {

                    let products = await Product.findAll({
                        include: [{
                            model: Category,
                            where: { 'id': id_category }
                        },
                        {
                            model: Diet,
                            where: { 'id': id_diet }
                        }]
                    })
                    return res.status(200).send(products)
                } else if (id_diet) {
                    let products = await Product.findAll({
                        include: [{
                            model: Diet,
                            through: { attributes: [] },
                            where: { 'id': id_diet }
                        }]
                    })
                    return res.status(200).send(products)
                } else if (id_category) {
                    let products = await Product.findAll({
                        include: [{
                            model: Category,
                            through: { attributes: [] },
                            where: { 'id': id_category }
                        }]
                    })
                    return res.status(200).send(products)
                }
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



export async function getById(req, res) {
    const { id } = req.params
    try {
        let products = await Product.findByPk(id)
        return res.json(products)
    }
    catch (err) {
        console.error({ err })
        res.json(err)
    }
}



export async function deleteProduct(req, res) {
    const { id } = req.params
    try {
        let product = await Product.destroy({ where: { id: id } })
        return res.json({
            message: 'Product deleted successfully',
            data: product
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
// export async function filterProductsbyCategory(req,res){
// const {id_category}=req.query
// try{
// let products=await Product.findAll({include: [ { 
//     model: Category,  
//     through: { attributes: [] },
//     where: { 'Category.id': id_category }
// } ]})
// return res.status(200).send(products)
//     }catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Something goes Wrong',
//             data: {}

//         })
//     }
// }

export async function postOrder(req, res) {
    const { id_product, id_order } = req.params
    var product = await Product.findByPk(id_product)
    var order = await Order.findByPk(id_order)
    var resultado = await product.addOrder(order)
    res.send(resultado)
}
export async function postDiet(req, res) {
    const { id_product, id_diet } = req.params
    var product = await Product.findByPk(id_product)
    var diet = await Diet.findByPk(id_diet)
    var resultado = await product.addDiet(diet)
    res.send(resultado)
}
export async function postCategory(req, res) {
    const { id_product, id_category } = req.params
    var product = await Product.findByPk(id_product)
    var category = await Category.findByPk(id_category)
    var resultado = await product.addCategory(category)
    res.send(resultado)
}
