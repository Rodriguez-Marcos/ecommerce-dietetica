const {Router} = require('express') 
import useExtractor from '../controllers/loginUser.js';
const {AddSucursal,PutSucursal,deleteSucursal,getSucursal} = require('../controllers/Sucursal')
const router = Router()

router.post('/',useExtractor, AddSucursal)
router.put('/:id',useExtractor, PutSucursal)
router.delete('/:id',useExtractor, deleteSucursal)
router.get('/', getSucursal)

export default router;