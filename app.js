//configrurar variables de entorno con dotenv
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// rutas
const routers = require('./routes/index');
const users = require('./routes/users');
const errorHandler = require('./routes/error');

// inicializaciones
const app = express();

// variables
const PORT = process.env.PORT || 3000;
const PUBLIC_FILES = path.join(__dirname, 'public');
const VIEWS = path.join(__dirname, 'views');
const GALERIA_PATH = path.join(__dirname, 'galeria');

// configuraciones
app.set('port', PORT);
app.set('views', VIEWS);
app.set('view engine', 'pug');

// seteando direcciones estaticas en el servidor
app.use('/public', express.static(PUBLIC_FILES));
app.use('/galeria', express.static(GALERIA_PATH));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));

// Global Variables

// rutas
app.use('/', routers);
app.use('/users', users);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server ready on http://localhost:${PORT}`));
