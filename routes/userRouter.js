const router = require('express').Router();

const { isAuthenticated } = require('../middleware/isAuthenticated');

const { userController } = require('../controllers');

router.use(isAuthenticated);

router.get('/profile', userController.getProfile);

module.exports = router;
