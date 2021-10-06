const { Router } = require('express')
const {removeProductCart } = require('../controllers/removeProductCart.js')
const router = Router()


router.delete('/', removeProductCart);


export default router;