const { extractToken, token } = require('../utils');

const isAuthenticated = async (req, res, next) => {
	try {
		const newError = new Error();
		if (!req.headers.authorization) {
			newError.name = 'Sin Accesso';
			newError.message = 'No Tienes Acceso, token missing';
			throw newError;
		}

		const tmpToken = extractToken(req.headers.authorization);
		const verifyToken = await token.verify(tmpToken);

		req.user = { ...verifyToken.data };
		console.log('Usuario verificado', verifyToken, req.user);
		next();
	} catch (error) {
		console.log('catch de is authenticated', error);
		//next(error);
		res.status(401).json({
			success: false,
			title: 'Sin Autorizacion',
			message: error.message,
		});
	}
};

const isAdmin = (req, res, next) => {
	console.log(extractToken(req.headers.authorization));
	next();
};

module.exports = { isAuthenticated, isAdmin };
