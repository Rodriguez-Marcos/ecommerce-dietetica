const {Router} = require('express') 

const {createClient, getClients, deleteClient, loginUser} = require('../controllers/client')

const router = Router()


router.post('/',createClient);
router.get('/login', loginUser)
router.get('/',getClients)
router.delete('/:id',deleteClient)


export default router;
