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

module.exports = mongoose;
