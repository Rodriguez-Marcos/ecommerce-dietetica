const { Router } = require('express')
const { createOrder,getOrders, deleteOrder, getOrderbyId } = require('../controllers/order')
const router = Router()


router.post('/', createOrder);
router.get('/',getOrders)
router.delete('/:id',deleteOrder),
router.get('/:id',getOrderbyId)

export default router;