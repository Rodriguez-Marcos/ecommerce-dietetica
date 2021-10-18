const { Router } = require('express')
import {createOrder} from '../controllers/order'
import payment from '../controllers/payment'

const router = Router()


router.post('/', payment)
router.get('/success', createOrder)

export default router;
