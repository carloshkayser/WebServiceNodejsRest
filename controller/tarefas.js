const Tarefas = require("../model/tarefa");

exports.buscarTodos = (req, res, next) => {

    Tarefas.findAll()
        .then(result => {
            res.json(result); // Transforma para Json e manda no response
        })
        // Caso ocorra algum erro durante o processo
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
};