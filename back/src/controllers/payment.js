import Cart from '../models/Cart'
import Product from '../models/Product'
import mercadopago from '../utils/mercadopago'


export default async function payment(req,res,next){
        const id_client = req.id;
        try {
            let cart = await Cart.findAll({where: {id_client: id_client}, include:[{model:Product}]})
            mercadopago(cart[0].products)
            
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something goes Wrong',
                data: {}
    
            })
    
        }
    
}