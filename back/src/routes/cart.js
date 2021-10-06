const { Router } = require('express')
const {addToCart, getCart, removeFromCart,  } = require('../controllers/cart')
const router = Router()


router.post('/', addToCart);

router.get('/',getCart);

router.delete('/', removeFromCart);


export default router;