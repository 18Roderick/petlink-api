const express = require('express');

const router = express.Router();

const authRouter = require('./authRouter');
const publicRouter = require('./publicRouter');

router.get('/robots.txt', function(req, res) {
	res.type('text/plain');
	res.send('User-agent: *\nDisallow: /');
});

router.use('/', publicRouter);

router.use('/auth', authRouter);

module.exports = router;
