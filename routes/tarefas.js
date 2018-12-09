const express = require("express");
const controller = require("../controller/tarefas");

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'You are in api page' });
});

router.get('/hello', function(req, res, next) {
    res.send('Youre in Hello World Page :)');
    res.status(200);
});

router.get('/tarefas', controller.buscarTodos)

module.exports = router;