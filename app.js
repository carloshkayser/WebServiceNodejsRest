var http = require("http");
var express = require("express");
var database = require("./database/database");
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var app = express();
var router = express.Router();

// Arquivo auxiliar para camada de autenticação usando JWT
var auth = require("./auth.js")();
app.use(auth.initialize());

// Camada de modelo
var Usuario = require("./model/usuario");
var Tarefa = require("./model/tarefa");

// Rotas
var usuarioRoute = require('./routes/usuario');
var tokenRoute = require('./routes/token');
var tarefasRoute = require('./routes/tarefa');
var indexRoute = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3030);
app.use(router);

// Rotass
app.use('/', indexRoute);
//app.use('/tarefa', tarefasRoute); // TODO
//app.use('/token', tokenRoute);
//app.use('/usuario', usuarioRoute);

// Acesso ao banco de dados
database.sync({ force: true }).then(() =>{
  return Usuario.create({
    usuario: 'admin',
    senha: 'admin'
  }),
  Tarefa.create({
    titulo: 'teste',
    descricao: 'teste desc',
    feita: false,
    usuario_id: 1
  });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;