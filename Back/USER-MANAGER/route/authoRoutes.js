const {Router} = require('express');
const autController = require('../controllers/authController');

const router = Router();

router.get('/singup',autController.singup_get);
router.post('/singup',autController.singup_post);
router.get('/login',autController.login_get);
router.post('/login',autController.login_post);

module.exports = router ; 

