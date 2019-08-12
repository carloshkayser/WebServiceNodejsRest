const express = require('express');
const userController = require("../controller/usuarios");

var router = express.Router();

// Cria usuario
router.post('/user', (req, res) => {
    userController.criarUsuario(req, res);
});

// Edita usuario
// router.put('/user', (req, res) => {
    // userController
// });

module.exports = router;