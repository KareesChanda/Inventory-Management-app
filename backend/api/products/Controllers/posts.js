'use strict';
const dbmain = require('../../../config/DB/DBmain');
const uuidv4 = require('uuid/v4');

module.exports = {
    async addProduct (opts, cb) {
        let Product = dbmain.model('Product');
        try {
            let infoObject = {
                id: uuidv4(),
                amount: opts.amount,
                price: opts.price,
                name: opts.name
            };
            let product = await Product.create(infoObject);
            let response = {
                id: product.id,
                name: product.name,
                amount: product.amount,
                price: product.price
            };
            cb(null, response);
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};