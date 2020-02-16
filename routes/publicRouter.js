const express = require('express');
const router = express.Router();

const { publicController } = require('../controllers');

router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Bienvenido al api de petlink',
	});
});

router.get('/about', publicController.getAbout);

module.exports = router;
