const mongoose = require('mongoose');

let url = '';

if (process.env.NODE_ENV === 'production') {
	url = process.env.MONGO_ATLAS_URL;
} else {
	url = process.env.MONGO_ATLAS_URL;
	//url = 'mongodb://localhost:27017/PetlinkDevelopment';
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
