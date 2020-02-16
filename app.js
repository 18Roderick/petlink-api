//configrurar variables de entorno con dotenv
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const mongoose = require('./models/connection');
// rutas
const routers = require('./routes');
const errorHandler = require('./routes/errorRouter');

// inicializaciones
const app = express();

// variables
const PORT = process.env.PORT || 3000;
const PUBLIC_FILES = path.join(__dirname, 'public');
const VIEWS = path.join(__dirname, 'views');
const GALERIA_PATH = path.join(__dirname, 'galeria');

// configuraciones
app.set('port', PORT);

// seteando direcciones estaticas en el servidor
app.use('/public', express.static(PUBLIC_FILES));
app.use('/galeria', express.static(GALERIA_PATH));

// middlewares
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));

// Global Variables

// routes
app.use(routers);

app.use(errorHandler);

app.use((err, req, res, next) => {
	console.error('Catch de ruta de error final', err.stack);
	res.status(500).json({
		success: false,
		title: err.name,
		message: err.message,
	});
});

//inicio de conexion a la base de datos
mongoose.connection.on(
	'error',
	console.error.bind(console, 'connection error:')
);
mongoose.connection.once('open', (...args) => {
	console.log('conexion exitosa');
	app.listen(PORT, () =>
		console.log(`server ready on http://localhost:${PORT}`)
	);
});

module.exports = app;
