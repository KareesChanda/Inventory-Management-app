'use strict';
const dbmain = require('../../../config/DB/DBmain');
const { validateHash } = require('../../Helpers/validations');
const { updateUserById } = require('../Controllers/updates');

module.exports = {
    async registerUser (info, cb) {
        let Customer = dbmain.model('Customer');
        try {
            Customer.findOrCreate({
                where: { email: info.email.toLowerCase() },
                defaults: {
                    password: info.password
                }
            }).spread((user, created) => {
                if(created) {
                    console.log('new user created ' + user.id);
                    let userResponseObject = {
                        id: user.id,
                        email: user.email,
                        password: user.password
                    };
                    return cb(null, userResponseObject);
                } else {
                    console.log('Account has already been created');
                    return cb(null, created, { message: 'email is already in use' })
                }
            });
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async signInCustomer (info, cb) {
        let Customer = dbmain.model('Customer');
        try {
            Customer.findOne({
                where: { email: info.email.toLowerCase() }
            }).then((user, err) => {
                if(err) throw err;

                if(!user) {
                    console.log('User has invalid credentials');
                    return cb(null, false, {message: 'Invalid username or password'})
                }
                //validate password
                validateHash(user.password, info.password, async (err, match) => {
                    if(err) {
                        throw err
                    }
                    if(!match) {
                        console.log('User has invalid credentials');
                        return cb(null, false, {message: 'Invalid email or password'})
                    }
                    else{
                        let userResponseObject = {
                            id: user.id,
                            email: user.email,
                            password: user.password
                        };
                        return cb(null, userResponseObject);
                    }
                })
            });
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async verifyUser (receivedUser, cb) {
        let User = dbmain.model('User');
        try {
            let user = await User.findById(receivedUser.id);
            if(user) {
                if(!user.isVerified) {
                    let info = {
                        isVerified: true
                    };
                    updateUserById(user.id,info, function(err, update) {
                        if(err)
                            return cb(err);
                        if(update) {
                            return cb(null,true);
                        } else {
                            return cb(null,false);
                        }
                    });
                }
                return cb(null,true)
            } else {
                return cb(null,false);
            }
        } catch (err) {
            return cb(err)
        }
    }
};