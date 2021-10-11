import Cart from '../models/Cart'
import Product from '../models/Product'
import Product_Cart from '../models/Product_Cart';
import Product_Order from '../models/Product_Order';
import mercadopago from '../utils/mercadopago'


export default async function payment(req,res,next){
        const id_client = req.id;
        try {
            
            let cart = await Cart.findOne({ where: { id_client: id_client }, include: [{ model: Product }] })
            let pago = await mercadopago(cart.products,res)
            return pago



         
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something goes Wrong',
                data: {}
    
            })
    
        }
    
}