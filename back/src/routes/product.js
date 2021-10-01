const { Router } = require('express')
const { createProduct,getProducts , getById, deleteProduct ,postOrder,updateProduct} = require('../controllers/product')
const router = Router()


router.post('/', createProduct);
router.post('/:id_product/orders/:id_order',postOrder);
router.get('/',getProducts);
router.get('/:id',getById);
router.delete('/:id',deleteProduct);
router.put('/:id',updateProduct)

export default router;