const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();

const Controllers = require('./controllers');
const formValidator = require('../middleware/formValidator');

const root = {};

router.get('/', (req, res) => {
	res.status(200).json({
		ok: true,
		message: 'Bienvenido al api de petlink',
	});
});

router.get('/adopt', async (req, res) => {
	res.render('adopt', { title: 'adopte', data: '' });
});

router.get('/about', (req, res) => {
	res.render('about', { title: 'acerca de' });
});

module.exports = router;
