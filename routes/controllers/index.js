const Usuario = require('../../models/Usuario');
const Crypting = require('../../utils/crytping');

const controllers = {};

controllers.signup = async (req, res) => {
  const { nombre, apellido, email, password1, celular, telefono } = req.body;
  try {
    const password = await Crypting.encrypt(password1);
    const newuser = new Usuario({
      nombre,
      apellido,
      email,
      contacto: {
        telefono: [telefono],
        celular: [celular]
      },
      password
    });
    const data = await newuser.save();
    res.json({
      data
    });
  } catch (error) {
    res.json({ error });
  }
};

controllers.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Usuario.findOne({ email });
    if (data) {
      const isCorrect = await Crypting.compare(password, data.password);

      if (isCorrect) {
        res.json({ message: 'login correcto' });
      } else {
        res.json({ message: 'Usuario o contrasena no coinciden' });
      }
    } else {
      res.json({ message: 'no existe el usuario' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

controllers.uploadImage = async (req, res) => {};

module.exports = controllers;
