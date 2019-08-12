const jwt = require('jsonwebtoken');
const cfg = require("../config/config");

exports.checkToken = (req, res, next) => {

    var token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    
    jwt.verify(token, cfg.jwtConfig.jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        };
      
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;

        next();
    });
}

exports.generateToken = (req, res, next) => {

    if (req.body.usuario && req.body.senha) {

        var usuario = req.body.usuario;
        var senha = req.body.senha;

        userModel.findOne({ where: { usuario: usuario } })
            .then(currentUser => {

                // console.log(currentUser);

                if (currentUser.senha === senha) {

                    var payload = { usuario_id: currentUser.usuario_id }
                    // var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);

                    var token = jwt.sign(payload, cfg.jwtConfig.jwtSecret);

                    // console.log(token);

                    res.status(200).json({ 
                        token: token,
                        usuario_id: currentUser.usuario_id
                    });

                } else {
                    res.sendStatus(401);
                }
            })
            .catch(error => {
                res.sendStatus(400).json("Usuario não encontrado!");
            });
    } else {
        res.sendStatus(400);
    }

}