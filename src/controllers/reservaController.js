const reservaService = require('../services/reservaService');

const obtenerReservas = async (req, res) => {
    try {
        const reservas = await reservaService.obtenerReservas();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearReserva = async (req, res) => {
    try {
        const nuevaReserva = await reservaService.crearReserva(req.body);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerReservas,
    crearReserva,
};