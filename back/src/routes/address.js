const {Router} = require('express') 

const {getAddress} = require('../controllers/address')

const router = Router()


router.get('/',getAddress);

export default router;