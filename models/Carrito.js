const mongoose = require('mongoose');

const { Schema } = mongoose;

const Carrito = new Schema({
  productos: {
    type: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Producto',
          cantidad: Number,
          precio: Number
        }
      }
    ]
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  total: Number,
  status: {
    type: String,
    enum: ['proceso', 'vendido']
  }
});

module.exports = mongoose.model('Carrito', Carrito);
