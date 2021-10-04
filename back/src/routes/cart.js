const { Router } = require('express')
const {  addCart } = require('../controllers/cart.js')
const router = Router()


router.post('/', addCart);
const {addToCart, getCarts  } = require('../controllers/cart')


router.post('/:id_client/products/:id_product', addToCart);
router.get('/',getCarts)


export default router;