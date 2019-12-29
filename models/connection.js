const mongoose = require('mongoose');
const config = require('../config/databaseConfig');

let url = '';

if (process.env.NODE_ENV === 'PRODUCTION') {
	url = process.env.MONGO_ATLAS_URL;
} else {
	url = process.env.DEV_MONGO_ATLAS_URL;
}

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', (...args) => {
	console.log('conexion exitosa');
});

module.exports = mongoose;
