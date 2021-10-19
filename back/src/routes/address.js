const {Router} = require('express') 

const {getAddress,addAddress,deleteAddress} = require('../controllers/address')

const router = Router()

router.post('/',addAddress)
router.get('/',getAddress);
router.delete('/:id',deleteAddress)


export default router;