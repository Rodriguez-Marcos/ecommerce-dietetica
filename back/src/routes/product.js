const { Router } = require('express')
const { createProduct,getProducts , getById, deleteProduct ,postOrder,updateProduct} = require('../controllers/product')
const router = Router()
const useExtractor = require('./middleware/useExtractor')



router.post('/',useExtractor, createProduct);
router.post('/:id_product/orders/:id_order',postOrder);
router.get('/',getProducts);
router.get('/:id',getById);
router.delete('/:id',useExtractor ,deleteProduct);
router.put('/:id',useExtractor ,updateProduct);

export default router;