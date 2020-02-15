const { extractToken, token } = require('../utils');

const isAuthenticated = async (req, res, next) => {
	try {
		const tmpToken = extractToken(req.headers.authorization);
		const verifyToken = await token.verify(tmpToken);
		console.log('token verificado', verifyToken);
		next();
	} catch (error) {
		res.status(301).json({
			success: false,
			message: 'Token Invalido',
			isValid: false,
		});
	}
};

const isAdmin = (req, res, next) => {
	console.log(extractToken(req.headers.authorization));
	next();
};

module.exports = { isAuthenticated, isAdmin };
