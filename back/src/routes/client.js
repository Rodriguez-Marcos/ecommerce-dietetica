const {Router} = require('express') 
const {createClient} = require('../controllers/client')
const router = Router()


router.post('/',createClient);

export default router;