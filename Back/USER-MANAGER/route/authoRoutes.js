const { Router } = require("express");
const autController = require("../controllers/authController");

const router = Router();

router.get("/signup", autController.signup_get);
router.post("/signup", autController.signup_post);
router.get("/login", autController.login_get);
router.post("/login", autController.login_post);

module.exports = router;
