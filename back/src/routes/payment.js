const { Router } = require('express')
import {createOrder} from '../controllers/order'
import {emptyCart} from '../controllers/cart'
import payment from '../controllers/payment'

const router = Router()


router.post('/', payment)
router.get('/success', createOrder)
router.get('/pending', emptyCart)

export default router;
