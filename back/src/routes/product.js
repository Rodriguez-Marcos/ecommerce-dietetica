const { Router } = require('express')
const { createProduct,getProducts, deleteProduct ,postOrder, postDiet, postCategory } = require('../controllers/product')
const router = Router()


router.post('/', createProduct);
router.post('/:id_product/orders/:id_order',postOrder);
router.post('/:id_product/diets/:id_diet',postDiet);
router.post('/:id_product/categories/:id_category',postCategory)
router.get('/',getProducts)
router.delete('/:id',deleteProduct)

export default router;