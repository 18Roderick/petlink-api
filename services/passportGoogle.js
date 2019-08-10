const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_ID, GOOGLE_SECRET } = require('../config/credentialsGoogle');
const { Usuario, Imagenes } = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: '/auth/google/redirect',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (accessToken, refreshToken, email2, profile, done) => {
      try {
        let user = await Usuario.findOne({ email: profile._json.email });
        if (!user) {
          user = await Usuario.create({
            nombre: profile._json.given_name,
            apellido: profile._json.family_name,
            email: profile._json.email,
            googleId: profile._json.sub
          });
          const imagen = await Imagenes.create({ usuario: user._id, path: profile._json.picture });
          console.log(imagen);
        }
        return done(null, user);
      } catch (error) {
        console.log('ocurrio un error :', error.message);
        return done(error, false, { message: 'ocurrio un errror ' });
      }
    }
  )
);
