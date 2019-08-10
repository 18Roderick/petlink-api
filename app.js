const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
// rutas
const routers = require('./routes/index');
const users = require('./routes/users');
const errorHandler = require('./routes/error');
const mongoose = require('./models/connection');
const flashConfig = require('./middleware/flashConfig');
// inicializaciones
const app = express();
require('./services/passport');
require('./services/passportGoogle');

// variables
const store = new MongoStore({ mongooseConnection: mongoose.connection });
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
app.use(favicon(path.join(PUBLIC_FILES, 'images', 'favicon.ico')));
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'abc545454234 55',
    store,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));

// Global Variables
app.use(flashConfig);

// rutas
app.use('/', routers);
app.use('/users', users);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server ready on http://localhost:${PORT}`));
