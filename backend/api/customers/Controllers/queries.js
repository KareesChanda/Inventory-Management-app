'use strict';
const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async getAllCustomers (opts, cb) {
        let User = dbmain.model('Customer');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page
        };
        try{
            let users = await User.findAll(options);
           let response = await Promise.all(await users.map(async user => {
            let obj = {};
            obj.firstName = user.firstName;
            obj.lastName = user.lastName;
            obj.emailAddress = user.email;
            obj.phone = user.phoneNumber;
            obj.status = user.status;
            return obj;
           }));
           return cb(null,response);
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    },
    async getUserById (id, cb) {
        let User = dbmain.model('Customer');
        try{
            let user = await User.findById(id);
            if(user) {
                return cb(null, {
                    email: user.email
                });
            } else {
                return cb(null, null)
            }
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    }
};