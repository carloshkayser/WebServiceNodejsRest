var jwt = require("jwt-simple");
var controller = require("../controller/usuarios");
var express = require("express");
var Usuario = require("../model/usuario");
var cgf = require("../config/config");

var router = express.Router();

// /token
router.post('/token', function (req, res) {
    if (req.body.usuario && req.body.senha) {
        var usuario = req.body.usuario;
        var senha = req.body.senha;

        var user = Usuarios.find(function (u) {
            return u.usuario === usuario && u.senha === senha;
        });
        if (user) {
            var payload = { id: user.usuario_id };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({ token: token });
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;