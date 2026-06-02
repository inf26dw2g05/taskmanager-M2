const db = require("../config/db");

// GET /users
// Lista todos los usuarios (sin password). Requiere autenticacion.
function getAllUsers(req, res) {
    db.query("SELECT id, username, email, created_at FROM users", function(err, results) {
        if (err) {
            res.status(500).json({
                message: "Error al obtener usuarios",
                error: err
            });
            return;
        }
        res.json(results);
    });
}

// GET /users/me
// Devuelve el perfil del usuario autenticado.
// Util para que el cliente sepa quien esta logueado a partir del token.
function getMe(req, res) {
    const id = req.user.id;

    db.query(
        "SELECT id, username, email, created_at FROM users WHERE id = ?",
        [id],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.json(results[0]);
        }
    );
}

// GET /users/:id
// Devuelve un usuario por id (informacion publica: sin password).
function getUserById(req, res) {
    const id = req.params.id;

    db.query(
        "SELECT id, username, email, created_at FROM users WHERE id = ?",
        [id],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.json(results[0]);
        }
    );
}

// PUT /users/me
// Actualiza el perfil del usuario autenticado.
// Solo puede modificar su propio username y email.
function updateMe(req, res) {
    const id = req.user.id;
    const { username, email } = req.body;

    db.query(
        "UPDATE users SET username = ?, email = ? WHERE id = ?",
        [username, email, id],
        function(err) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ message: "Usuario actualizado correctamente" });
        }
    );
}

// DELETE /users/me
// Elimina la cuenta del usuario autenticado.
// El ON DELETE CASCADE de la BD borra automaticamente sus proyectos y tareas.
function deleteMe(req, res) {
    const id = req.user.id;

    db.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        function(err) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ message: "Usuario eliminado correctamente" });
        }
    );
}

module.exports = {
    getAllUsers,
    getMe,
    getUserById,
    updateMe,
    deleteMe
};