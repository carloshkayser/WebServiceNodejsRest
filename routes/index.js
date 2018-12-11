var express = require("express");
var jwt = require("jwt-simple");
var auth = require("../controller/auntenticacao");
var cfg = require("../config/config");
var Usuario = require("../model/usuario");
var router = express.Router();

// Camada de controle
var ctlrTarefas = require("../controller/tarefas");
var ctlrUsuarios = require("../controller/usuarios");

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'You are in api page' });
});

// TAREFAS
router.get('/tarefa/todos/:id', auth.checkToken, ctlrTarefas.buscarTodos);
router.post('/tarefa', auth.checkToken, ctlrTarefas.criar);

router.get('/tarefa/:id', auth.checkToken, ctlrTarefas.buscarUm);
router.put('/tarefa/:id', auth.checkToken, ctlrTarefas.alterarTarefa);
router.delete('/tarefa/:id', auth.checkToken, ctlrTarefas.deletarTarefa);

// USUARIOS
router.post('/usuario', auth.checkToken, ctlrUsuarios.criarUsuario);

router.get('/usuario/:id', auth.checkToken, ctlrUsuarios.buscarUm);
router.put('/usuario/:id', auth.checkToken, ctlrUsuarios.alterarUsuario);
router.delete('/usuario/:id', auth.checkToken, ctlrUsuarios.deletarUsuario);

// ..:: TOKEN ::.. 
// Auntenticar usuario
router.post('/login', function (req, res) {
    if (req.body.usuario && req.body.senha) {
        var usuario = req.body.usuario;
        var senha = req.body.senha;

        Usuario.findOne({ where: { usuario: usuario } })
            .then(currentUser => {
                if (currentUser.senha === senha) {
                    var payload = { usuario_id: currentUser.usuario_id }
                    var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);
                    res.json({ 
                        token: token,
                        usuario_id: currentUser.usuario_id
                    });
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