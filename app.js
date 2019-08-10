const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// rutas
const routers = require('./routes/index');
const users = require('./routes/users');
const errorHandler = require('./routes/error');

// inicializaciones
const app = express();
// variables
const PORT = process.env.PORT || 3000;
const GALERIA_PATH = path.join(__dirname, 'galeria');
// configuraciones
app.set('port', PORT);

// seteando direcciones estaticas en el servidor
app.use('/galeria', express.static(GALERIA_PATH));
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Global Variables
// rutas
app.use('/', routers);
app.use('/users', users);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server ready on http://localhost:${PORT}`));
