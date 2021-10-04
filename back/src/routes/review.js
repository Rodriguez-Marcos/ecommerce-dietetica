const { Router } = require('express')
const {addReview, getReview} = require("../controllers/addReview");
const router = Router()


router.post("/:id", addReview);
router.get("/:id", getReview)


export default router;