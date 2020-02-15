const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Bienvenido al api de petlink',
	});
});

router.get('/adopt', async (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Pagina de adopcion',
		data: [],
	});
});

router.get('/about', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Pagina de acerca de Petlink y sus desarrolladores',
		data: [],
	});
});

module.exports = router;
