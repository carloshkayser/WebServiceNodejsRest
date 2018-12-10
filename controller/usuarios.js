const Usuarios = require("../model/usuario");

// exports.login = (req, res, next) => {

//     Tarefas.findAll({
//         where: { usuario_id: req.params.id }
//     })
//         .then(result => {
//             res.json(result); // Transforma para Json e manda no response
//         })
//         // Caso ocorra algum erro durante o processo
//         .catch(error => {
//             res.status(412).json({ msg: error.message });
//         });
// };