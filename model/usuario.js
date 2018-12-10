const Sequelize = require("sequelize");
const sequelize = require("../database/database");

var Tarefa = require("../model/tarefa");

const Usuario = sequelize.define("usuario", {
    usuario_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    usuario: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 16]
        }
    },
    senha: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 16]
        }
    }
});

Usuario.hasMany(Tarefa, {foreignKey: 'usuario_id'})
Tarefa.belongsTo(Usuario, {foreignKey:'usuario_id'})

module.exports = Usuario;