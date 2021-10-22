const { Router } = require('express')
const { createProduct,getProducts , getById, deleteProduct ,postOrder,updateProduct, getProductsAdmin, bestQualifiedProducts} = require('../controllers/product')
const router = Router()
import useExtractor from '../middleware/useExtractor'



router.post('/',useExtractor, createProduct);
router.post('/getProducts', getProducts);
router.post('/:id_product/orders/:id_order',postOrder);
router.get('/',getProducts);
router.get('/admin',getProductsAdmin);
router.get('/reviews',bestQualifiedProducts)
router.get('/:id',getById);
router.delete('/:id',useExtractor ,deleteProduct);
router.put('/:id' ,updateProduct);


export default router;