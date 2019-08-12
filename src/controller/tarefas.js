var Tarefas = require("../model/tarefa");
var User = require("../model/usuario");

exports.get = (request, response, next) => {

    var id = request.params.id;
    Tarefas.findById(id)
        .then(Tarefas => {
            if (Tarefas) {
                response.send(Tarefas);
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.getAllTasks = (req, res, next) => {

    Tarefas.findAll({
        where: { usuario_id: req.params.id }
    })
        .then(result => {
            res.json(result); // Transforma para Json e manda no response
        })
        // Caso ocorra algum erro durante o processo
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};

// Metodo para criar as tarefas
exports.createTask = (req, res, next) => {

    console.log('Criando nova tarefa!');

    Tarefas.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        feita: req.body.feita,
        usuario_id: req.body.usuario_id
    })
        .then(result => {
            res.status(200).json(result);
        })
        // Caso ocorra algum erro durante o processo
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
};

exports.removeTask = (req, res, next) => {
    // Better just apply a flag to remove
    Tarefas.destroy({
        force: true,
        where: {
            id: req.params.id,
            usuario_id: req.body.usuario_id
        }
    })
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};

exports.updateTask = (req, res, next) => {

    Tarefas.update(req.body, {
        where: {
            id: req.body.id,
            usuario_id: req.body.usuario_id
        }
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};

exports.finishTask = (req, res, next) => {

    Tarefas.update(req.body.feita, {
        where: {
            id: req.body.id,
            usuario_id: req.body.usuario_id
        }
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};