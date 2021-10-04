const { Router } = require('express')
const {addToCart, getCarts  } = require('../controllers/cart')
const router = Router()


router.post('/:id_client/products/:id_product', addToCart);
router.get('/',getCarts)


export default router;