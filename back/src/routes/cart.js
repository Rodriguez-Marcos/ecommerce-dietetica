const { Router } = require('express')
const {addToCart, getCart, removeFromCart, emptyCart,addAddressCart} = require('../controllers/cart')
const router = Router()


router.post('/', addToCart);
router.put('/',addAddressCart)
router.get('/',getCart);

router.delete('/', removeFromCart);
router.get('/emptycart',emptyCart)


export default router;
