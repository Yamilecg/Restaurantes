require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Reserva = require('./models/reserva');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Recomendado por CosmosDB
  retryWrites: false,
  authMechanism: 'SCRAM-SHA-256',
}).then(() => {
  console.log('✅ Conectado a MongoDB Azure Cosmos');
}).catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✔️');
});

// Ruta para crear reserva (ejemplo)
app.post('/reservas', async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar la reserva' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
