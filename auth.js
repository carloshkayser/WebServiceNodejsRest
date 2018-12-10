var passport = require("passport");
var passportJWT = require("passport-jwt");
const Users = require("./model/usuario.js");
const cfg = require("./config/config.js");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

module.exports = app => {
  const params = {
    secretOrKey: cfg.jwtConfig.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  const strategy = new Strategy(params, (payload, done) => {
      Users.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => done(error, null));
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