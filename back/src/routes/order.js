const { Router } = require('express')
const { createOrder,getOrders, deleteOrder,changeOrderStatus,bestSellers,totalOrderByDay} = require('../controllers/order')
const router = Router()


//router.post('/', createOrder);
router.get('/',getOrders)
router.delete('/:id',deleteOrder),
router.put('/:id',changeOrderStatus)
router.get('/bestsellers', bestSellers)
router.get('/totalbyday', totalOrderByDay)

export default router;