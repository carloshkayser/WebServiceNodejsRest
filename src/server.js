const express = require("express")
const cors = require('cors') // https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

const routes = require("./routes/routes")
const database = require("./database/database");
const server = express();

// Cria as tabelas no banco de dados (caso as mesmas não forem criadas)
database.sync();

server.use(express.json());
server.use(routes);
server.use(cors());

// error handler
server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.server.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
  });

server.listen(3333);