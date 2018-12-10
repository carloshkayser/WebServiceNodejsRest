var Usuarios = require("../model/usuario");

exports.buscarUm = (req, res, next) => {
    var id = req.params.id;
    Usuarios.findById(id)
        .then(Usuarios => {
            if (Usuarios) {
                res.send(Usuarios);
            } else {
                res.status(404).send();
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
        response.json("Usuário criado com sucesso!");
        response.status(201).send();
    }).catch((error) => next(error))
};

exports.alterarUsuario = (request, response, next) => {

    Usuarios.update(request.body, {
        where: {
            usuario_id: request.body.usuario_id
        }
    }).then(() => {
        response.json("Usuario editado com sucesso!");
        response.status(200).send();
    })
        .catch(error => next(error));
};

exports.deletarUsuario = (request, response, next) => {
    const id = request.params.id;

    Usuarios.destroy({
        force: true,
        where: { usuario_id: id }
    }).then(() => {
        response.json("Usuario deletado com sucesso!");
        response.status(200).send().re;
    })
        .catch(error => next(error));
};