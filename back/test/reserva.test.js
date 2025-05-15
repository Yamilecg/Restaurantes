const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Reserva = require('../models/reserva');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Reserva.deleteMany(); 
});

test('crea y guarda una reserva correctamente', async () => {
  const reservaData = {
    nombre: 'Juan Perez',           
    fecha: new Date('2025-06-01T19:00:00'),
    dia: 'Lunes',
    numeroDePersonas: 3,
  };

  const reserva = new Reserva(reservaData);
  const savedReserva = await reserva.save();

  expect(savedReserva._id).toBeDefined();
  expect(savedReserva.nombre).toBe(reservaData.nombre);   
  expect(savedReserva.dia).toBe(reservaData.dia);
  expect(savedReserva.numeroDePersonas).toBe(reservaData.numeroDePersonas);
});