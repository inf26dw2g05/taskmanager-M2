const db = require("../config/db");

function getAllTasks(req, res) {
    const userId = req.user.id;

    db.query(
        `SELECT tasks.*
         FROM tasks
         INNER JOIN projects ON tasks.project_id = projects.id
         WHERE projects.user_id = ?`,
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

function getTaskById(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    db.query(
        `SELECT tasks.*
         FROM tasks
         INNER JOIN projects ON tasks.project_id = projects.id
         WHERE tasks.id = ? AND projects.user_id = ?`,
        [id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.length === 0) {
                res.status(404).json({
                    message: "Tarea no encontrada o sin permisos"
                });
                return;
            }

            res.json(results[0]);
        }
    );
}

function createTask(req, res) {
    const { title, description, completed, project_id } = req.body;
    const userId = req.user.id;

    db.query(
        "SELECT * FROM projects WHERE id = ? AND user_id = ?",
        [project_id, userId],
        function(err, projects) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (projects.length === 0) {
                res.status(403).json({
                    message: "No puedes crear tareas en un proyecto que no es tuyo"
                });
                return;
            }

            db.query(
                "INSERT INTO tasks (title, description, completed, project_id) VALUES (?, ?, ?, ?)",
                [title, description, completed, project_id],
                function(err, results) {
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }

                    res.status(201).json({
                        message: "Tarea creada correctamente",
                        taskId: results.insertId
                    });
                }
            );
        }
    );
}

function updateTask(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const { title, description, completed } = req.body;

    db.query(
        `UPDATE tasks
         INNER JOIN projects ON tasks.project_id = projects.id
         SET tasks.title = ?, tasks.description = ?, tasks.completed = ?
         WHERE tasks.id = ? AND projects.user_id = ?`,
        [title, description, completed, id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "Tarea no encontrada o sin permisos"
                });
                return;
            }

            res.json({
                message: "Tarea actualizada correctamente"
            });
        }
    );
}

function deleteTask(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    db.query(
        `DELETE tasks
         FROM tasks
         INNER JOIN projects ON tasks.project_id = projects.id
         WHERE tasks.id = ? AND projects.user_id = ?`,
        [id, userId],
        function(err, results) {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "Tarea no encontrada o sin permisos"
                });
                return;
            }

            res.json({
                message: "Tarea eliminada correctamente"
            });
        }
    );
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};