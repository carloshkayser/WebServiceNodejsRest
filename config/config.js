module.exports = {
    database: {
        host: 'localhost',
        port: 5534,
        name: 'WebServiceNodejsRest',
        dialect: 'postgres',
        user: 'postgres',
        password: 'postgres'
    },
    jwtConfig: {
        jwtSecret: "KeySecreta",
        jwtSession: { session: false } //  Esse item é utilizado para informar o Passport que a API não irá gerenciar a sessão.
    }
};