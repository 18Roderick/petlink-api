const mongoose = require('mongoose');
const config = require('../config/databaseConfig');

let url = '';

if (process.env.NODE_ENV === 'production') {
  url = config.url(config.password, config.database);
} else {
  url = 'mongodb://localhost:27017/PetlinkDevelopment';
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', (...args) => {
  console.log('conexion exitosa');
});

module.exports = mongoose;
