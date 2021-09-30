import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Diet from '../models/Diet.js';
import Category from '../models/Category.js';
import { Sequelize,Op } from 'sequelize';

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
    let { name, id_category, id_diet,priceL,priceH } = req.query
    try {
        if (!id_category && !name && !id_diet) {

            var products = await Product.findAll()
            //res.status(200).send(products)
        }
        else {
            if (name) {
            

                var products = await Product.findAll({
                    where: {
                        name: { [Op.iLike]: `%${name}%` }
                    }
                })
                //res.status(200).json(products)
            } else {
                if (id_category && id_diet) {

                    var products = await Product.findAll({
                        include: [{
                            model: Category,
                            where: { 'id': id_category }
                        },
                        {
                            model: Diet,
                            where: { 'id': id_diet }
                        }]
                    })
                    //res.status(200).send(products)
                } else if (id_diet) {
                    var products = await Product.findAll({
                        include: [{
                            model: Diet,
                            through: { attributes: [] },
                            where: { 'id': id_diet }
                        }]
                    })
                    //res.status(200).send(products)
                } else if (id_category) {
                    var products = await Product.findAll({
                        include: [{
                            model: Category,
                            through: { attributes: [] },
                            where: { 'id': id_category }
                        }]
                    })
                    //res.status(200).send(products)
                }
            }
        }
        if(!priceL)priceL=0;
        if(!priceH)priceH= await Product.max("price")
        let productsName = products.map(product=>product.name)
        let productsFound= await Product.findAll({where:{name:productsName, price:{[Op.between]: [parseInt(priceL), parseInt(priceH)],}}})
        return res.status(200).send(productsFound)
        
        
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
