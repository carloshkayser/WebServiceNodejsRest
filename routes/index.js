var express = require("express");
var jwt = require("jwt-simple");
var auth = require("../controller/auntenticacao");
var ctlrTarefas = require("../controller/tarefas");
var cfg = require("../config/config");
var Usuario = require("../model/usuario");
// var auth = require("../auth.js");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'You are in api page' });
});

// .:: TAREFAS ::.
router.get('/tarefa', auth.checkToken, function (req, res, next) {
    res.json("Chamou!");
});

// Buscar todas as tarefas do usuario logado
router.get('/tarefa/todos/:id', auth.checkToken, ctlrTarefas.buscarTodos);

// Cria tarefas
router.post('/tarefa/criar', auth.checkToken, ctlrTarefas.criar);

// Deleta tarefas
router.delete('/tarefa/delete/:id', auth.checkToken, ctlrTarefas.deletarTarefa);

// ..:: TOKEN ::.. 
// Auntenticar usuario
router.post('/token', function (req, res) {
    if (req.body.usuario && req.body.senha) {
        var usuario = req.body.usuario;
        var senha = req.body.senha;

        Usuario.findOne({ where: { usuario: usuario } })
            .then(currentUser => {
                if (currentUser.senha === senha) {
                    var payload = { usuario_id: currentUser.usuario_id }
                    var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);
                    res.json({ token: token });
                } else {
                    res.sendStatus(401);
                }
            })
            .catch(error => {
                res.sendStatus(401);
                console.log("Usuario não encontrado!");
            });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;