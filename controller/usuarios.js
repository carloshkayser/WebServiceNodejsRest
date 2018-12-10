var Usuarios = require("../model/usuario");

exports.buscarUm = (req, res, next) => {
    var id = req.params.usuario_id;
    Usuarios.findById(id)
        .then(Usuarios => {
            if (Usuarios) {
                response.send(Usuarios);
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));

};

exports.buscarTodos = (request, response, next) => {
    Usuarios.findAll
        .then(Usuarios => {
            if (Usuarios) {
                response.send(Usuarios);
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.criarUsuario = (request, response, next) => {
    const usuario = request.body.usuario;
    const senha = request.body.senha;

    Usuarios.create({
        usuario: usuario,
        senha: senha
    }).then(() => {
        response.status(201).send();
    }).catch((error) => next(error))
};

exports.alterarUsuario = (request, response, next) => {
    const usuario = request.body.usuario;
    const senha = request.body.senha;

    Usuarios.findById(id)
        .then(Usuarios => {
            if (Usuarios) {
                Usuarios.update(
                    {
                        usuario: usuario,
                        senha: senha
                    },
                    { where: { usuario_id: id } }
                ).then(() => {
                    response.status(200).send();
                })
                    .catch(error => next(error));
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.deletarUsuario = (request, response, next) => {
    const id = request.body.id;

    Usuarios.findById(id)
        .then(Usuarios => {
            if (Usuarios) {
                Usuarios.destroy(
                    { where: { usuario_id: id } }
                ).then(() => {
                    response.status(200).send();
                })
                    .catch(error => next(error));
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};