const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function register(req, res) {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function(err, results) {
            if (err) {
                res.status(500).json({
                    message: "Error al registrar usuario",
                    error: err
                });
                return;
            }

            res.status(201).json({
                message: "Usuario registrado correctamente",
                userId: results.insertId
            });
        }
    );
}

function login(req, res) {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        function(err, results) {
            if (err) {
                res.status(500).json({
                    message: "Error al iniciar sesión",
                    error: err
                });
                return;
            }

            if (results.length === 0) {
                res.status(401).json({
                    message: "Credenciales inválidas"
                });
                return;
            }

            const user = results[0];

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                res.status(401).json({
                    message: "Credenciales inválidas"
                });
                return;
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.json({
                message: "Login correcto",
                token: token
            });
        }
    );
}

module.exports = {
    register,
    login
};