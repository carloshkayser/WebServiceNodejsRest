var UsuariosModel = require("../model/usuario");

exports.buscarUm = (req, res, next) => {

    var id = req.params.id;

    UsuariosModel.findById(id)
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
    UsuariosModel.findAll
        .then(Usuarios => {
            if (Usuarios) {
                response.send(Usuarios);
            } else {
                response.status(404).send();
            }
        })
        .catch(error => next(error));
};

exports.criarUsuario = (request, response) => {

    if (request.body.usuario && request.body.senha) {

        const { usuario } = request.body;
        const { senha } = request.body;

        UsuariosModel.create({
            usuario: usuario,
            senha: senha
        }).then(() => {
            response.json("Usuário criado com sucesso!");
            response.status(200).send();
        });
        
        // .catch((error) => next(error));

    } else {
        response.sendStatus(400);
    }
};

exports.alterarUsuario = (request, response, next) => {

    if (request.body.usuario_id) {

        UsuariosModel.update(request.body, {
            where: {
                usuario_id: request.body.usuario_id
            }
        }).then(() => {
            response.json("Usuario editado com sucesso!");
            response.status(200).send();
        }).catch(error => next(error));

    } else {
        response.sendStatus(400);
    }
    
};

exports.deletarUsuario = (request, response, next) => {
    const id = request.params.id;

    UsuariosModel.destroy({
        force: true,
        where: { usuario_id: id }
    }).then(() => {
        response.json("Usuario deletado com sucesso!");
        response.status(200).send().re;
    })
        .catch(error => next(error));
};