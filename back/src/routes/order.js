const { Router } = require('express')
const { createOrder,getOrders, deleteOrder,changeOrderStatus} = require('../controllers/order')
const router = Router()


router.post('/', createOrder);
router.get('/',getOrders)
router.delete('/:id',deleteOrder),
router.put('/:id',changeOrderStatus)

export default router;