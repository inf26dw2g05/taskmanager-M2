const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const db = require("./config/db");

const authMiddleware = require("./middlewares/auth.middleware");

const usersRoutes = require("./routes/users.routes");
const projectsRoutes = require("./routes/projects.routes");
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = 3000;

const swaggerDocument = YAML.load("./api/openapi.yaml");

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, usersRoutes);
app.use("/projects", authMiddleware, projectsRoutes);
app.use("/tasks", authMiddleware, tasksRoutes);

app.get("/", function (req, res) {
    res.json({
        message: "TaskManager API funcionando"
    });
});

app.listen(port, function () {
    console.log(`app running on localhost:${port}`);
});