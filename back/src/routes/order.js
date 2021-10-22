const { Router } = require('express')
const { createOrder,getOrders, deleteOrder,changeOrderStatus,bestSellers,totalOrderByDay} = require('../controllers/order')
const router = Router()
import useExtractor from '../controllers/loginUser.js';


//router.post('/', createOrder);
router.get('/',useExtractor,getOrders)
router.delete('/:id',useExtractor,deleteOrder),
router.put('/:id',useExtractor,changeOrderStatus)
router.get('/bestsellers', bestSellers)
router.get('/totalbyday',useExtractor, totalOrderByDay)

export default router;