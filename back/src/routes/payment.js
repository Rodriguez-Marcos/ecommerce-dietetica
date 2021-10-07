const { Router } = require('express')
import payment from '../controllers/payment'
const router = Router()


router.post('/', payment)

export default router;