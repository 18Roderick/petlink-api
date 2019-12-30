require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const TOKEN_ALGORITHM = process.env.TOKEN_ALGORITHM || 'SH256';
const PRIVATE_KEY = fs.readFileSync('./token_private.key', 'utf8'); // keys privados del token
const PUBLIC_KEY = fs.readFileSync('./token_public.key', 'utf8'); //keys publicos del token

//configuracion del token
const tokenConfig = {
	issuer: 'Petlink',
	expiresIn: '1h',
	algorithm: TOKEN_ALGORITHM,
	audience: 'Client_Identity',
};

//creacion del token
async function create(data) {
	try {
		return await jwt.sign({ data }, PRIVATE_KEY, tokenConfig);
	} catch (error) {
		throw error;
	}
}

//verificacion del token
async function verify(token) {
	try {
		const verfied = await jwt.decode(token, { complete: true });
		return {
			success: true,
			data: verfied.payload.data,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
}

//decodificacion del token
async function decode(token) {
	try {
		const verfied = await jwt.decode(token, { complete: true });
		return {
			success: true,
			data: verfied.payload.data,
		};
	} catch (error) {
		throw error;
	}
}

module.exports = {
	decode,
	create,
	verify,
};
