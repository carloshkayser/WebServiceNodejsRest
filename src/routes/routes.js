const express = require("express");

const routes = express.Router();

const auth = require('./auth');
const userRoute = require('./usuario');
const tasksRoute = require('./tarefa');

// Error
routes.use(function(err, req, res, next) {
    console.log("Errooou!")
    console.error(err.stack);
    res.status(500).send('Something broken!');
}); 

routes.use(auth);
routes.use(userRoute);
routes.use(tasksRoute);

// routes.get("/", (req, res) => {
//     return res.json({ message: 'Hello World!' });
//     // return res.json({ message: `Hello ${req.query.name}`});
// });

// Exemplo de middleware
// routes.use(function (req, res, next) {
//     console.log('middleware');
//     // console.log(req);
//     next();
// });

// // Auth
// routes.use(function (req, res, next) {
    
//     next();
// });


// routes.get("/teste", (req, res) => {
//     return res.json({ message: 'Hello Teste!' });
//     // return res.json({ message: `Hello ${req.query.name}`});
// });

module.exports = routes;