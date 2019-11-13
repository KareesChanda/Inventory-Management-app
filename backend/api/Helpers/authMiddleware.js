const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config_env')[env];

function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ error: 'No token provided.' });
    jwt.verify(token, config.jwt_secret, function(err, decoded) {
        if (err)
            return res.status(403).send({ error: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;