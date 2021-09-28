const { Router } = require('express')
const { createOrder,getOrders, deleteOrder } = require('../controllers/order')
const router = Router()


router.post('/', createOrder);
router.get('/',getOrders)
router.delete('/:id',deleteOrder)

export default router;