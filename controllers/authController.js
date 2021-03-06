const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const Crypting = require('../utils/crytping');
const { token } = require('../utils');

//controlador de registro de usuario
module.exports.signup = async (req, res) => {
	console.log('Ruta de regtistro', req.body);
	const errors = validationResult(req);

	const { nombre, apellido, email, password1, celular, telefono } = req.body;
	try {
		if (!errors.isEmpty())
			res.status(400).json({ success: false, errors: errors.array() });
		else {
			const newuser = new Usuario({
				nombre,
				apellido,
				email,
				telefono,
				celular,
				password: await Crypting.encrypt(password1),
			});
			const data = await newuser.save();
			res.status(201).json({
				success: true,
				token: await token.create({ id: data._id }),
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message, code: error.code });
	}
};

//controlador de iniciar sesion de usuario
module.exports.signIn = async (req, res) => {
	console.log('en inicio de sesion', req.body);
	const { email, password } = req.body;
	try {
		const data = await Usuario.findOne({ email });
		if (data) {
			console.log('ruta Iniciar sesion ');
			if (await Crypting.compare(password, data.password)) {
				res.status(202).json({
					success: true,
					message: 'login correcto',
					token: await token.create({ id: data._id, roll: data.roll }),
				});
			} else {
				res.status(400).json({
					success: false,
					message: 'Usuario o contrasena no coinciden',
				});
			}
		} else {
			res.status(400).json({ message: 'no existe el usuario' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
