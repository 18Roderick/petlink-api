const moongose = require('mongoose');

const { Schema } = moongose;

const Producto = new Schema({
  tipo: {
    type: String,
    enum: ['ropa', 'jueguetes', 'aseo', 'accesorios'],
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    require: true
  },
  proveedor: {
    type: String
  },
  descripcion: {
    type: String
  }
});

module.exports = moongose.model('Producto', Producto);
