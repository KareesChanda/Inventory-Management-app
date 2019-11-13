'use strict';
const dbmain = require('../../config/DB/DBmain');
const bcrypt = require('bcrypt');


module.exports = {
    async validateHash(currentHash, providedHash, cb) {
        let match;
        try {
            console.log("Validating password...");
            match = await bcrypt.compare(providedHash, currentHash);
            cb(null, match)
        } catch(err) {
            console.error(err);
            cb(err)
        }
    }
};