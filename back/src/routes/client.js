import useExtractor from '../controllers/loginUser';

const {Router} = require('express') 

const {createClient, getClients, deleteClient, loginUser,updateClientToAdmin, RegOrCreateGaccount, resetPassword} = require('../controllers/client')

const router = Router()


router.post('/',createClient);
router.post('/bygoogle',useExtractor, RegOrCreateGaccount)
router.get('/login', loginUser)
router.get('/',getClients)
router.delete('/:id',deleteClient)
router.put('/:id',updateClientToAdmin)
router.put('/resetpassword/:id',resetPassword)


export default router;
