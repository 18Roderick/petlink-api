const mongoose = require('mongoose');

const { Schema } = mongoose;

const Usuario = new Schema({
  googleId: {
    type: String
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  foto: {
    type: Schema.Types.ObjectId,
    ref: 'Imagenes'
  },
  contacto: {
    type: {
      telefono: String,
      celular: String
    }
  },
  perros: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Perro'
    }
  ],
  password: {
    type: String
  },
  roll: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario',
    required: true
  },
  status: {
    type: {
      code: String,
      active: {
        type: Boolean,
        default: false
      }
    }
  },
  direccion: {
    provincia: String,
    distrito: String,
    corregimiento: String,
    detalles: String
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Usuario', Usuario);
