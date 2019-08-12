module.exports = {
    database: {
        host: '192.168.99.100',
        port: 3306,
        name: 'tasks_db',
        dialect: 'mysql',
        user: 'root',
        password: 'password'
    },
    jwtConfig: {
        jwtSecret: "KeySecreta",
        jwtSession: { session: false } //  Esse item é utilizado para informar o Passport que a API não irá gerenciar a sessão.
    }
};