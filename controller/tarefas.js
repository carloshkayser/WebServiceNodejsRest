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

    // Tarefas.create({

    // })
    //     .then(result => {
    //         res.json(result); // Transforma para Json e manda no response
    //     })
    //     // Caso ocorra algum erro durante o processo
    //     .catch(error => {
    //         res.status(412).json({ msg: error.message });
    //     });
};