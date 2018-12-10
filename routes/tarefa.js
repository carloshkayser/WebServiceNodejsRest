var express = require("express");
var controllertarefas = require("../controller/tarefas");
var auth = require("../auth.js")();

var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'You are in api page' });
// });

// Buscar todas as tarefas do usuario logado
router.get('/tarefa/todos/:id', auth.authenticate(), controllertarefas.buscarTodos);

module.exports = router;