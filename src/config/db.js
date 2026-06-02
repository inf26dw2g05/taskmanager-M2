const mysql = require("mysql2");

// Usamos un POOL en lugar de una conexion unica.
// Razones:
//  1. Si una conexion se cae, el pool crea otra automaticamente.
//  2. Multiples requests en paralelo no se bloquean entre si.
//  3. Es la practica recomendada para servidores web.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.query("SELECT 1", function(err) {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        return;
    }
    console.log("Connected to MySQL database");
});

module.exports = pool;