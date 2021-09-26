const { Router } = require('express')
const { createProduct } = require('../controllers/product')
const router = Router()


router.post('/', createProduct);

export default router;