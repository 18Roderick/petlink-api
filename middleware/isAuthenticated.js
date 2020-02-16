const { extractToken, token } = require('../utils');

const isAuthenticated = async (req, res, next) => {
	try {
		const tmpToken = extractToken(req.headers.authorization);
		const verifyToken = await token.verify(tmpToken);

		req.user = { ...verifyToken.data };
		console.log('Usuario verificado', verifyToken, req.user);
		next();
	} catch (error) {
		console.log('catch de is authenticated', error);
		next(error);
	}
};

const isAdmin = (req, res, next) => {
	console.log(extractToken(req.headers.authorization));
	next();
};

module.exports = { isAuthenticated, isAdmin };
