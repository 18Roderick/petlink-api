const { check } = require('express-validator/check');
const Usuario = require('../models/Usuario');

const validadores = [
  check('nombre', 'debe contener nombre del usuario')
    .not()
    .isEmpty(),
  check('apellido', 'debe contener su apellido')
    .not()
    .isEmpty(),
  check('email', 'se requiere un email')
    .not()
    .isEmpty(),
  check('email', 'por favor introduzca un email valido')
    .isEmail()
    .normalizeEmail(),
  check('email').custom(async value => {
    const user = await Usuario.findOne({ email: value });
    if (user) throw new Error('El usuario ya existe');
    return true;
  }),
  check('telefono').optional(),
  check('celular').optional(),
  check('password1', 'contrasena debe contener al menos 5 caracteres')
    .not()
    .isEmpty()
    .isLength({ min: 5 }),
  check('password2', 'contrasena no coinciden')
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password1) throw new Error('contrasenas no coinciden');
      return true;
    })
];
module.exports = validadores;
