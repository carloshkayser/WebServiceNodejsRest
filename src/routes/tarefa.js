var express = require("express");
var tasksController = require("../controller/tarefas");
var auth = require("../controller/auntenticacao");

var router = express.Router();

router.get('/tasks/:id', auth.checkToken, tasksController.getAllTasks);
router.post('/tasks', auth.checkToken, tasksController.createTask);
router.post('/tasks', auth.checkToken, tasksController.updateTask);
router.post('/tasks', auth.checkToken, tasksController.removeTask);
router.post('/tasks', auth.checkToken, tasksController.finishTask);

module.exports = router;