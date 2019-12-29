const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');
const { formValidator } = require('../middleware');

router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Rutas de autenticacion',
	});
});
router.post('/iniciar-sesion', authController.signIn);
router.post('/registro-usuario', formValidator, authController.signup);

module.exports = router;
