const { Router } = require('express')
const {addReview, allowReview, getReview} = require("../controllers/addReview");
const router = Router()


router.post("/:id", addReview);
router.get("/allow/:id",allowReview)
router.get("/:id", getReview)



export default router;