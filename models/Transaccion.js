const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transaccion = new Schema({
  orden: { type: Number, required: true },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  carrito: {
    type: Schema.Types.ObjectId,
    ref: 'Carrito'
  }
});

module.exports = mongoose.model('Transaccion', Transaccion);
