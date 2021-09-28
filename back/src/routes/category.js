const { Router } = require('express')
const { createCategory, getCategories, deleteCategory  } = require('../controllers/category')
const router = Router()


router.post('/', createCategory);
router.get('/',getCategories)
router.delete('/:id',deleteCategory)

export default router;