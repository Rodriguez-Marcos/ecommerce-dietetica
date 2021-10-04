import { loginUser } from '../controllers/loginUser';

const { Router } = require('express')
const router = Router()


router.post('/', loginUser);

export default router;