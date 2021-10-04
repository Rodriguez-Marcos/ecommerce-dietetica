const {Router} = require('express') 
const {createClient, createClientGoogle ,getClients, deleteClient,clientLogin} = require('../controllers/client')
const router = Router()


router.post('/',createClient);
router.post('/bygoogle', createClientGoogle)
router.get('/',getClients)
router.delete('/:id',deleteClient)


export default router;
