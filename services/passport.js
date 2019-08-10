const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator/check');

const { Usuario, Imagenes } = require('../models');
const Crypting = require('../utils/crytping');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password1',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const errors = validationResult(req);
      const errorMessage = errors.array().map(m => m.msg);
      try {
        console.log('dentro del passport ', errorMessage);
        if (!errors.isEmpty()) return done(null, false, req.flash('errors', errorMessage));
        const { nombre, apellido, password1, celular, telefono } = req.body;
        const encryptPassword = await Crypting.encrypt(password1);
        const data = await Usuario.create({
          nombre,
          apellido,
          email,
          contacto: {
            telefono: [telefono],
            celular: [celular]
          },
          password: encryptPassword,
          status: {
            code: '',
            active: false
          }
        });

        return done(null, data);
      } catch (error) {
        console.log('error en localstrategy passport', error);
        return done(error, false);
      }
    }
  )
);

passport.use(
  'signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await Usuario.findOne({ email });
        if (!user) {
          return done(null, false, req.flash('errors', 'no existe el usuario'));
        }
        if (!user.password) {
          return done(null, false, req.flash('errors', 'usuario o contraseña no coinciden'));
        }
        if (!(await Crypting.compare(password, user.password))) {
          return done(null, false, req.flash('errors', 'usuario o contraseña no coinciden'));
        }

        return done(
          null,
          user,
          req.flash('message_succes', `Bienvenido ${user.nombre} ${user.apellido}`)
        );
      } catch (error) {
        return done(error, false, { message: error.message });
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const data = await Usuario.findOne({ _id: id });
  done(null, data);
});
