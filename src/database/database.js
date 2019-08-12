const Sequelize = require('sequelize');
const config = require("../config/config.js");

const database = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);

module.exports = database;