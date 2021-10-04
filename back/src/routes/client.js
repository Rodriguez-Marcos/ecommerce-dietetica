const {Router} = require('express') 

const {createClient, createClientGoogle ,getClients, deleteClient, loginUser, loginBygoogle} = require('../controllers/client')

const router = Router()


router.post('/',createClient);
router.post('/bygoogle', createClientGoogle)
router.get('', loginUser)
router.get('/loginbygoogle', loginBygoogle)
router.get('/',getClients)
router.delete('/:id',deleteClient)


export default router;
