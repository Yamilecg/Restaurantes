
module.exports = {
    validateReserva: (reserva) => {
        if (!reserva.fecha || !reserva.hora || !reserva.numPersonas || !reserva.nombreCliente || !reserva.contacto) {
            return false;
        }
        return true;
    },
    validateUsuario: (usuario) => {
        if (!usuario.nombre || !usuario.email || !usuario.password) {
            return false;
        }
        return true;
    }
};