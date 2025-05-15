const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sentry = require('@sentry/node');
const Reserva = require('./models/reserva');

 
dotenv.config();

 
Sentry.init({
  dsn: 'https://3c226ed9dd7b9cc571735ffedfcc2c68@o4509328064708608.ingest.us.sentry.io/4509328760766464',
  sendDefaultPii: true,
});

require('./instrument.js');

const app = express();

 
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(cors({
  origin: 'https://dev2-r-bhatd5ege6e2cjex.centralus-01.azurewebsites.net',
  credentials: true
}));

const PORT = process.env.PORT || 3000;

 
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
    Sentry.captureException(err);
  });

 
app.get("/", (req, res) => {
  res.send("Hello world!");
});

 
app.get('/test-sentry', (req, res) => {
  throw new Error('My first Sentry error!');
});

 
app.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    console.log("Reservas encontradas:", reservas);
    res.json(reservas);
  } catch (err) {
    console.error("Error al obtener reservas:", err);
    Sentry.captureException(err);
    res.status(500).send("Error al obtener reservas");
  }
});

 
app.post('/reservas', async (req, res) => {
  try {
    const nueva = new Reserva(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    console.error("Error al guardar la reserva:", err);
    Sentry.captureException(err);
    res.status(500).json({ error: 'Error al guardar la reserva' });
  }
});

 
app.use(Sentry.Handlers.errorHandler());
 
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

 
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
