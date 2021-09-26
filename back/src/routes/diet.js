const { Router } = require('express')
const { createDiet } = require('../controllers/diet')
const router = Router()


router.post('/', createDiet);

export default router;