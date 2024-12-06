const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.put('/push-subscription', auth, userController.updatePushSubscription);

module.exports = router;