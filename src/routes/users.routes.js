const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

// /users/me debe ir ANTES que /:id, si no Express interpreta "me" como un id
router.get("/me", usersController.getMe);
router.put("/me", usersController.updateMe);
router.delete("/me", usersController.deleteMe);

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);

module.exports = router;