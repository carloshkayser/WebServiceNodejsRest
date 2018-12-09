const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Tarefa = sequelize.define("tarefa", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    titulo: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    descricao: {
        allowNull: false,
        type: Sequelize.TEXT
    },
    feita: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

    // TODO // Adicionar estrangeira de usuario na tarefa
});
module.exports = Tarefa;