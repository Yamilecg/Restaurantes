const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Rutas para Reservas
router.get('/reservas', reservaController.obtenerReservas);
router.post('/reservas', reservaController.crearReserva);
router.put('/reservas/:id', reservaController.actualizarReserva);
router.delete('/reservas/:id', reservaController.eliminarReserva);

module.exports = router;