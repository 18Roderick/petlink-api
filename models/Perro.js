const mongoose = require('mongoose');

const { Schema } = mongoose;

const Perro = Schema({
  nombre: {
    type: String,
    require: true
  },
  raza: {
    type: String
  },
  sexo: {
    type: String,
    required: true,
    enum: ['H', 'M']
  },
  edad: {
    type: Number
  },
  detalles: String,
  recomendado: {
    type: {
      bebes: Boolean,
      ninos: Boolean,
      adultos: Boolean,
      descripcion: String
    }
  },
  status: {
    type: String,
    enum: ['adoptado', 'adoptame', 'disponible', 'nodisponible'],
    default: 'nodisponible'
  },
  fotos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Imagenes'
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = mongoose.model('Perro', Perro);
