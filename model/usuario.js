const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define("usuario", {
    id: {
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
module.exports = Usuario;