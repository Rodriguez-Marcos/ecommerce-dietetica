const { Router } = require('express')
const { createFavorite, getFavorites } = require('../controllers/favorite')
const router = Router()


router.post('/', createFavorite);
router.get('/',getFavorites)


export default router;