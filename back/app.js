const mongoose = require('mongoose');
const Reserva = require('./models/reserva');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ Conectado a MongoDB');

  // Crear una nueva reserva
  const nuevaReserva = new Reserva({
    nombre: 'Pedro Gómez',
    fecha: new Date('2025-05-15T20:00:00'),
    dia: 'Jueves',
    numeroDePersonas: 4
  });

  await nuevaReserva.save();
  console.log('✅ Reserva guardada:', nuevaReserva);

  await mongoose.disconnect();
}

run().catch(err => console.error('❌ Error:', err));
