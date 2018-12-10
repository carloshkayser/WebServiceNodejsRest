var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require("./model/usuario.js");
var cfg = require("./config/config.js");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: cfg.jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = app = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var user = users[payload.id] || null;
    if (user) {
      return done(null, {id: user.id});
    } else {
      return done(new Error("Usuário não encontrado!"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtConfig.jwtSession);
    }
  };
};