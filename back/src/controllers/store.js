import Store from '../models/Store.js';
import Product from '../models/Product.js';


export async function getStore(req, res) {
    let {id_store} = req.query;
    try {
        if(id_store){
        var store = await Store.findOne({where: {id_store: id_store}, include:[{model:Product}]})
        } else { 
        var store = await Store.findAll({include:[{model:Product}]})
        }
        return res.status(200).send(store)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}