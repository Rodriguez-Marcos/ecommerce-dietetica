const router = require("express").Router();
const addReview = require("../controllers/addReview");
router.use(express.json());

const router = Router()


router.post("/", addReview);


export default router;