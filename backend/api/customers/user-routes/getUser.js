"use strict";
const { getUserById } = require('../Controllers/queries');
//route used for retrieving a specific user
module.exports = async function (req, res, next) {
    let userId = parseInt(req.params.userId);
    if (Number.isNaN(userId)) {
        res.status(400).send({
            error: 'user id must be a number'
        });
        return;
    }
    getUserById(userId, function(err, user) {
        if(err)
            return next(err);
        if(!!user) {
            return res.status(200).send(user);
        }
        return res.status.end();
    });
};