const express = require('express');
const passport = require('passport');
const { validationResult } = require('express-validator/check');

const router = express.Router();

const Controllers = require('./controllers');
const formValidator = require('../middleware/formValidator');

const root = {};

router.get('/', (req, res) => {
  root.title = 'Petlink';
  res.render('index', root);
});
router.get('/test', (req, res) => {
  res.render('test');
})
router.get('/adopt', async (req, res) => {
  res.render('adopt', { title: 'adopte', data: '' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'acerca de' });
});

router.get('/login/signin', (req, res) => {
  console.log(req.locals);
  res.render('signin', { title: 'Iniciar sesion' });
});

router.get('/login/signup', (req, res) => {
  res.render('signup', { title: 'Registro de Usuario' });
});

router.post(
  '/login/signup',
  formValidator,
  passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/login/signup',
    failureFlash: true,
    successFlash: true
  })
);

router.post(
  '/login/signin',
  passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/login/signin',
    failureFlash: true,
    successFlash: true
  })
);

router.get('/login/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login/signin', successRedirect: '/' })
);

module.exports = router;
