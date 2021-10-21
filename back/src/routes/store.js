const { Router } = require('express')
const {getStore} = require("../controllers/store");
const router = Router()


router.get("/", getStore)



export default router;