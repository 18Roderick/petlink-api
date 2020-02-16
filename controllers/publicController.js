const colaboradores = require('../data/colaboradores.json');

module.exports.getAbout = async (req, res, next) => {
	res.status(200).json({
		success: true,
		data: colaboradores,
	});
};
