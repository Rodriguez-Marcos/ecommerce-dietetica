import Cart from '../models/Cart'
import Product from '../models/Product'
import mercadopago from '../utils/mercadopago'


export default async function payment(req,res,next){
        const id_client = req.id;
        const items = req.body;
        try {
            let cart = await Cart.findAll({where: {id_client: id_client}, include:[{model:Product}]})
            let handle = [];
             cart[0].products.forEach(x=>{
                items.forEach(e => {
                    x.id === e.id? handle.push({...x,quantity: e.quantity}):false;
                });
            })
            console.log(cart[0].products)
            mercadopago(handle,quantity,res)
            
            
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something goes Wrong',
                data: {}
    
            })
    
        }
    
}