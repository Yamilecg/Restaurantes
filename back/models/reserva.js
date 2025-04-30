const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  dia: {
    type: String,
    required: true
  },
  numeroDePersonas: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Reserva', reservaSchema);
