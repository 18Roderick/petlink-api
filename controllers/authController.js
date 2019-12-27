const Usuario = require('../models/Usuario');
const Crypting = require('../utils/crytping');

//controlador de registro de usuario
module.exports.signup = async (req, res) => {
	const { nombre, apellido, email, password1, celular, telefono } = req.body;
	try {
		const password = await Crypting.encrypt(password1);
		const newuser = new Usuario({
			nombre,
			apellido,
			email,
			contacto: {
				telefono: [telefono],
				celular: [celular],
			},
			password,
		});
		const data = await newuser.save();
		res.json({
			data,
		});
	} catch (error) {
		res.json({ error });
	}
};

//controlador de iniciar sesion de usuario
module.exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const data = await Usuario.findOne({ email });
		if (data) {
			if (await Crypting.compare(password, data.password)) {
				res.json({ message: 'login correcto' });
			} else {
				res.json({ message: 'Usuario o contrasena no coinciden' });
			}
		} else {
			res.json({ message: 'no existe el usuario' });
		}
	} catch (error) {
		res.json({ message: error.message });
	}
};
