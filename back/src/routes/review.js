const { Router } = require('express')
const {addReview} = require("../controllers/addReview");
const router = Router()


router.post("/:id", addReview);


export default router;