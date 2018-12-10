var Tarefas = require("../model/tarefa");
var User = require("../model/usuario");

exports.buscarTodos = (req, res, next) => {

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
exports.criar = (req, res, next) => {

    console.log('Criando nova tarefa!');

    Tarefas.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        feita: req.body.feita,
        usuario_id: req.body.usuario_id
    })
        .then(result => {
            res.json("Tarefa criada com sucesso!");
            res.status(200);
        })
        // Caso ocorra algum erro durante o processo
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
};

exports.deletarTarefa = (req, res, next) => {

    Tarefas.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};

exports.alterarTarefa = (req, res, next) => {

    Tarefas.update(req.body, {
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};