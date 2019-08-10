const mongoose = require('mongoose');

const { Schema } = mongoose;

const Imagenes = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  perro: {
    type: Schema.Types.ObjectId,
    ref: 'Perro'
  },
  nombre: String,
  path: String
});

module.exports = mongoose.model('Imagenes', Imagenes);
