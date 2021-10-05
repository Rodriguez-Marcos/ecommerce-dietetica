const { Router } = require('express')
const {  addCart } = require('../controllers/cart.js')
const {addToCart, getCarts  } = require('../controllers/cart')
const router = Router()


router.post('/', addToCart);


router.get('/',getCarts)


export default router;