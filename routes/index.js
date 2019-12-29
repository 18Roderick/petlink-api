const express = require('express');

const router = express.Router();

const authRouter = require('./authRouter');
const publicRouter = require('./publicRouter');

router.use('/', publicRouter);

router.use('/auth', authRouter);

module.exports = router;
