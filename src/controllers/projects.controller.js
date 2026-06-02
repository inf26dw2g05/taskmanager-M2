const db = require("../config/db");

function getAllProjects(req, res) {
    const userId = req.user.id;

    db.query(
        "SELECT * FROM projects WHERE user_id = ?",
        [userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            res.json(results);
        }
    );
}

function getProjectById(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    db.query(
        "SELECT * FROM projects WHERE id = ? AND user_id = ?",
        [id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.length === 0) {
                res.status(404).json({
                    message: "Proyecto no encontrado o sin permisos"
                });
                return;
            }

            res.json(results[0]);
        }
    );
}

function createProject(req, res) {
    const { name, description } = req.body;
    const userId = req.user.id;

    db.query(
        "INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)",
        [name, description, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            res.status(201).json({
                message: "Proyecto creado correctamente",
                projectId: results.insertId
            });
        }
    );
}

function updateProject(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const { name, description } = req.body;

    db.query(
        "UPDATE projects SET name = ?, description = ? WHERE id = ? AND user_id = ?",
        [name, description, id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "Proyecto no encontrado o sin permisos"
                });
                return;
            }

            res.json({
                message: "Proyecto actualizado correctamente"
            });
        }
    );
}

function deleteProject(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    db.query(
        "DELETE FROM projects WHERE id = ? AND user_id = ?",
        [id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "Proyecto no encontrado o sin permisos"
                });
                return;
            }

            res.json({
                message: "Proyecto eliminado correctamente"
            });
        }
    );
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};