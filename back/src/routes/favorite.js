const { Router } = require('express')
const { addToFavorite, getFavorite,removeFromFavorite } = require('../controllers/favorite')
const router = Router()


router.post('/', addToFavorite);

router.get('/',getFavorite);

router.delete('/', removeFromFavorite);

export default router;