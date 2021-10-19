const { Router } = require('express')
const {addToCart, getCart, removeFromCart, emptyCart} = require('../controllers/cart')
const router = Router()


router.post('/', addToCart);

router.get('/',getCart);

router.delete('/', removeFromCart);
router.get('/emptycart',emptyCart)


export default router;
