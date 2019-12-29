require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'FOIN398JF98HN3';
const TOKEN_ALGORITHM = process.env.TOKEN_ALGORITHM || 'SH256';

const tokenConfig = {
	issuer: 'Petlink',
	expiresIn: '1h',
	algorithm: TOKEN_ALGORITHM,
};

async function create(data) {
	try {
		return jwt.sign({ data }, TOKEN_SECRET, tokenConfig);
	} catch (error) {
		throw error;
	}
}

async function decode(token) {}

create({ nombre: 'roderick' })
	.then(token => console.log(token))
	.catch(error => console.log(error));

module.exports = {
	decode,
	create,
};
