const express = require('express');

const router = express.Router();

router.use((req, res) => {
	console.log('catch de error de ruta 404');
	res.status(404).json({
		success: false,
		title: 'Pagina 404',
		message: 'Error 404',
		stack: `Pagina no encontrada ${req.protocol}://${req.hostname}${req.url}`,
	});
});

module.exports = router;
