'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async deleteProduct (opts, cb) {
        let Product = dbmain.model('Product');
        try {
            let infoObject = {
                id: opts.id
            };
            await Product.destroy({
                where: infoObject
            });
            cb(null, true);
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async updateProduct (opts, id, cb) {
        let Product = dbmain.model('Product');
        try {
            console.log(opts);
            Product.update(
               opts, { returning: true, where: { id: id } }
            ).then(async function([rowsUpdated, [productUpdated]]) {
                if(!productUpdated)
                    return cb(null, false);
                return cb(null, true)
            })
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};