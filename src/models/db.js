const sql = require('mssql');

const config = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'tu_servidor.database.windows.net',
    database: 'tu_base_de_datos',
    options: {
        encrypt: true, // Usar en Azure
    },
};

const pool = new sql.ConnectionPool(config);
pool.connect().then(() => console.log('Conectado a Azure SQL Database'));

module.exports = pool;