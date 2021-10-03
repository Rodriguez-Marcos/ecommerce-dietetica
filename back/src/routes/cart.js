const { Router } = require('express')
const {createCart, getCarts  } = require('../controllers/cart')
const router = Router()


router.post('/:id_client', createCart);
router.get('/',getCarts)


export default router;