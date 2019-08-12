const express = require('express');
const userModel = require('../model/usuario'); // TODO Mover para controller!!
const cfg = require("../config/config");
const jwt = require('jsonwebtoken');

const router = express.Router();

// ..:: TOKEN ::.. 
// Logar usuario
router.post('/login', (req, res) => {

    console.log("/login");

    if (req.body.usuario && req.body.senha) {

        var usuario = req.body.usuario;
        var senha = req.body.senha;

        userModel.findOne({ where: { usuario: usuario } })
            .then(currentUser => {

                // console.log(currentUser);

                if (currentUser.senha === senha) {

                    var payload = { usuario_id: currentUser.usuario_id }
                    // var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);

                    var token = jwt.sign(payload, cfg.jwtConfig.jwtSecret);

                    // console.log(token);

                    res.status(200).json({ 
                        token: token,
                        usuario_id: currentUser.usuario_id
                    });

                } else {
                    res.sendStatus(401);
                }
            })
            .catch(error => {
                res.sendStatus(400).json("Usuario não encontrado!");
            });
    } else {
        res.sendStatus(400);
    }

});

module.exports = router;