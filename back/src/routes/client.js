const {Router} = require('express') 
const {createClient,getClients, deleteClient} = require('../controllers/client')
const router = Router()


router.post('/',createClient);
router.get('/',getClients)
router.delete('/:id',deleteClient)

export default router;