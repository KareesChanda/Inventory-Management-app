'use strict';
const dbmain = require('../../../config/DB/DBmain');
const bcrypt = require('bcrypt');
const saltRounds = 5;

module.exports = {
    async updateUserById (id, attributes, cb) {
        let User = dbmain.model('Customer');
        try {
            if(attributes.password) {
                let user = await User.findById(id);
                if (user.password === attributes.password) {
                    return cb(null, false)
                } else {
                    bcrypt.genSalt(saltRounds, (err, salt) => { //generate salt using saltRounds provided
                        if (err) return cb(err);
                        bcrypt.hash(attributes.password, salt, async (err, hash) => { //generate hash using password and salt generated
                            console.log("Getting password encrypted...");
                            attributes.password = hash;
                            await User.update( attributes, { where: { id: id } });
                            return cb(null, true)
                        });
                    });
                }
            } else {
                await User.update( attributes, { where: { id: id } });
                return cb(null, true)
            }
        } catch (err) {
            return cb(err)
        }
    }
};