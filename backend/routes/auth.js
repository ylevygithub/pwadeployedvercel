const router = require('express').Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin, validate } = require('../middleware/validator');
const auth = require('../middleware/authMiddleware');

router.post('/register', validateRegistration, validate, authController.register);
router.post('/login', validateLogin, validate, authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;