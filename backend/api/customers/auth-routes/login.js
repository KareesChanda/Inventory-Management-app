"use strict";
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config_env')[env];
const { signInCustomer } = require('../Services/profileAuthService');

//route used for logging a user in
module.exports = function (req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().regex(
            //password must contain letters or numbers
            //and be a minumum of 6 characters, maximum 30
            new RegExp('^[a-zA-Z0-9]{6,30}$')
        )
    });
    const {error, value} = Joi.validate(req.body, schema);
    if (error) {
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).send({
                    error: 'please provide valid email address'
                });
                break;
            case 'password':
                res.status(400).send({
                    error: 'please provide a valid password'
                });
                break;
            default:
                res.status(400).end();
        }
    } else {
        signInCustomer(req.body, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log(info.message);
                res.status(400).send({
                    error: info.message
                });
            } else {
                try {
                    const token = jwt.sign(user, config.jwt_secret, {expiresIn: '12h'});
                    res.json({
                        userId: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        token
                    });
                } catch (error) {
                    return next(error);
                }
            }
        });
    }
};