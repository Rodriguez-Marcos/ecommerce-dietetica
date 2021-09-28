const { Router } = require('express')
const { createDiet,getDiets, deleteDiet } = require('../controllers/diet')
const router = Router()


router.post('/', createDiet);
router.get('/',getDiets)
router.delete('/:id',deleteDiet)

export default router;