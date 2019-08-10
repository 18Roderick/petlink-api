const mongoose = require('mongoose');

const { Schema } = mongoose;

const Localizacion = new Schema({
  pais: {
    type: {
      nombre: String,
      provincias: [
        {
          nombre: String,
          distritos: [
            {
              nombre: String,
              corregimientos: [
                {
                  nombre: String
                }
              ]
            }
          ]
        }
      ]
    }
  }
});

module.exports = mongoose.model('Localizacion', Localizacion);
