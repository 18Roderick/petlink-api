//controladores de ruta de usuario
const { upload: imageUploader } = require('../utils/imageUploader');
const { Usuario, Imagenes, Producto } = require('../models');

module.exports.getProfile = async (req, res, next) => {
	try {
		console.log('ruta de Perfil de Usuario');
		const user = await Usuario.findById(req.user.id, '-__v -roll -password');
		user.foto = await Imagenes.findOne({ usuario: user.id });

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};
