const router = require('express').Router();
const { isAdmin } = require('../middleware/isAuthenticated');

router.use(isAdmin);

module.exports = router;
