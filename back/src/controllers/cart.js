import Cart from '../models/Cart.js';

export async function createCart(req, res) {
    const { id_client } = req.params;
    try {
        let newCart = await Cart.create({
            
            'id_client':id_client
        }
        )
        if (newCart) {
            return res.json({
                message: 'Cart created successfully',
                data: newCart
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
export async function getCarts(req, res) {
    try{
    let carts = await Cart.findAll()
    return res.status(200).send(carts)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}