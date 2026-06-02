const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).json({
            message: "Token no proporcionado"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Token inválido"
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
        if (err) {
            res.status(403).json({
                message: "Token no válido"
            });
            return;
        }

        req.user = user;

        console.log("Usuario autenticado:", req.user);

        next();
    });
}

module.exports = authMiddleware;