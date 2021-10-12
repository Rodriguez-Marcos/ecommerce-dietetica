const { Router } = require('express')
import { emptyCart } from '../controllers/cart'
import payment from '../controllers/payment'

const router = Router()


router.post('/', payment)
router.get('/success', emptyCart)

export default router;