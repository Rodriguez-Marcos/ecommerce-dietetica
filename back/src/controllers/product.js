import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Diet from '../models/Diet.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { Sequelize, Op } from 'sequelize';

export async function createProduct(req, res) {
    const { name, price, description, image, stock, ids_categories, ids_diets } = req.body;
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
        if (ids_categories) {
            let categories = await Category.findAll({ where: { id: ids_categories } })
            await newProduct.addCategory(categories)
        }
        if (ids_diets) {
            let diets = await Diet.findAll({ where: { id: ids_diets } })
            await newProduct.addDiet(diets)
        }

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

export async function getProductsAdmin(req, res) {
    let { name, id_category, id_diet, priceL, priceH, sortby } = req.query;
    let { id } = req.body;
    try {
        if (id) {
            id = id.map(({ id }) => id)
            let products = await Product.findAll({
                where: { id }, include: [{
                    model: Category,
                },
                {
                    model: Diet,
                }]
            })
            return res.status(200).json(products)
        }
        if (!id_category && !name && !id_diet) {

            var products = await Product.findAll({
                include: [{
                    model: Category,
                },
                {
                    model: Diet,
                }]
            })
            //res.status(200).send(products)
        }
        else {
            if (name) {

                var products = await Product.findAll({
                    where: {
                        name: { [Op.iLike]: `%${name}%` }
                    },
                    include: [{
                        model: Category,
                    },
                    {
                        model: Diet,
                    }]

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
        if (!priceL) priceL = 0;
        if (!priceH) priceH = await Product.max("price")
        let productsName = products.map(product => product.name)
        var productsFound = await Product.findAll({
            where: { name: productsName, price: { [Op.between]: [parseInt(priceL), parseInt(priceH)], } },
            include: [{
                model: Category,
            },
            {
                model: Diet,
            }]
        })
        if (sortby) {
            if (sortby === 'AscendentName') {
                productsFound.sort((a, b) => a.name.localeCompare(b.name))
            } else if (sortby === 'DescendentName') {
                productsFound.sort((a, b) => b.name.localeCompare(a.name))
            } else if (sortby === 'AscendentPrice') {
                productsFound.sort((a, b) => a.price - b.price)
            } else if (sortby === 'DescendentPrice') {
                productsFound.sort((a, b) => b.price - a.price)
            }
        }


        return res.status(200).send(productsFound)


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}
        })
    }
}

export async function getProducts(req, res) {
    let { name, id_category, id_diet, priceL, priceH, sortby } = req.query;
    let { id } = req.body;

    try {
        if (id) {
            id = id.map(({ id }) => id)
            let products = await Product.findAll({
                where: { id },
                include: [{
                    model: Category,
                },
                {
                    model: Diet,
                }]
            })
            return res.status(200).json(products)
        }
        if (!id_category && !name && !id_diet) {

            var products = await Product.findAll({
                where: { stock: { [Op.gt]: 0 } },
                include: [{
                    model: Category,
                },
                {
                    model: Diet,
                }]
            })
            //res.status(200).send(products)
        }
        else {
            if (name) {

                var products = await Product.findAll({
                    where: {
                        name: { [Op.iLike]: `%${name}%` },
                        stock: { [Op.gt]: 0 }
                    },
                    include: [{
                        model: Category,
                    },
                    {
                        model: Diet,
                    }]

                })
                //res.status(200).json(products)
            } else {
                if (id_category && id_diet) {

                    var products = await Product.findAll({
                        where: { stock: { [Op.gt]: 0 } },
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
                        where: { stock: { [Op.gt]: 0 } },
                        include: [{
                            model: Diet,
                            through: { attributes: [] },
                            where: { 'id': id_diet }
                        }]
                    })
                    //res.status(200).send(products)
                } else if (id_category) {
                    var products = await Product.findAll({
                        where: { stock: { [Op.gt]: 0 } },
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
        if (!priceL) priceL = 0;
        if (!priceH) priceH = await Product.max("price")
        let productsName = products.map(product => product.name)
        var productsFound = await Product.findAll({ where: { name: productsName, price: { [Op.between]: [parseInt(priceL), parseInt(priceH)], } } })
        if (sortby) {
            if (sortby === 'AscendentName') {
                productsFound.sort((a, b) => a.name.localeCompare(b.name))
            } else if (sortby === 'DescendentName') {
                productsFound.sort((a, b) => b.name.localeCompare(a.name))
            } else if (sortby === 'AscendentPrice') {
                productsFound.sort((a, b) => a.price - b.price)
            } else if (sortby === 'DescendentPrice') {
                productsFound.sort((a, b) => b.price - a.price)
            }
        }


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
        let products = await Product.findAll({ where: { id: id }, include: [{ model: Category }, { model: Diet }, { model: Review }] })
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

export async function updateProduct(req, res) {
    const { id } = req.params
    const { name, price, description, image, stock, ids_categories, ids_diets } = req.body
    try {

        await Product.update({
            name: name,
            price: price,
            description: description,
            image: image,
            stock: stock
        }, {
            where: { id: id }, include: [{ model: Category }, { model: Diet }]
        }
        )


        var product = await Product.findOne({ where: { id: id }, include: [{ model: Category }, { model: Diet }] })
        if (ids_categories) {
            var categories = await Category.findAll({ where: { id: ids_categories } })
            await product.setCategories(categories)
        }
        if (ids_diets) {
            var diets = await Diet.findAll({ where: { id: ids_diets } })
            await product.setDiets(diets)

            return res.json({
                message: 'Product updated successfully'
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

export async function postOrder(req, res) {
    const { id_product, id_order } = req.params
    var product = await Product.findByPk(id_product)
    var order = await Order.findByPk(id_order)
    var resultado = await product.addOrder(order)
    res.send(resultado)
}
