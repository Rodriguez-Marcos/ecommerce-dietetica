const {Router} = require('express') 

const {getAddress,addAddress,deleteAddress,updateAddress} = require('../controllers/address')

const router = Router()

router.post('/',addAddress)
router.get('/',getAddress);
router.delete('/:id',deleteAddress)
router.put('/:id',updateAddress)


export default router;