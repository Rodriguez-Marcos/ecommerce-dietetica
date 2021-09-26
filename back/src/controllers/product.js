import Product from '../models/Product.js';

export async function createProduct(req, res) {
    const { name, price, description } = req.body;
    try {
        let newProduct = await Product.create({
            name,
            price,
            description,
        }, {
            fields: ['name', 'price', 'description']
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