const { Router } = require('express')
const {addReview} = require("../controllers/addReview");
const router = Router()


router.post("/", addReview);


export default router;