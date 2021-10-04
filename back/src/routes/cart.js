const { Router } = require('express')
const {  addCart } = require('../controllers/cart.js')
const router = Router()


router.post('/', addCart);

export default router;