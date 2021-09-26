const { Router } = require('express')
const { createCategory } = require('../controllers/category')
const router = Router()


router.post('/', createCategory);

export default router;