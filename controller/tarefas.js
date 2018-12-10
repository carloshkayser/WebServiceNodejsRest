var Tarefas = require("../model/tarefa");
var User = require("../model/usuario");

exports.buscarUm = (request, response, next) => {

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
        force: true,
        where: {
            id: req.params.id,
            usuario_id: req.body.usuario_id
        }
    })
        .then(result =>{
            res.json("Tarefa deletada com sucesso!");
            res.status(200);
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};

exports.alterarTarefa = (req, res, next) => {

    Tarefas.update(req.body, {
        where: {
            id: req.body.id,
            usuario_id: req.body.usuario_id
        }
    })
        .then(result => {
            res.json("Tarefa editada com sucesso!");
            res.status(200);
        })
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};