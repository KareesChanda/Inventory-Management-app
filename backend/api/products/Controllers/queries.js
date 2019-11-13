'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async getAllProducts (page, limit, query, cb) {
        let Product = dbmain.model('Product');
        let options = {
            where: query || {},
            limit: limit,
            offset: page
        };
        try {
            let response = [];
            let products = await Product.findAll(options);
            response = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    amount: product.amount,
                    price: product.price
                };
            });
            return cb(null, response);
        } catch(err) {
            console.error(err);
            cb(err);
        }
    },
    async getProductById (id) {
        let Product = dbmain.model('Product');
        try {
            let product = await Product.findById(id);
            return {
                id: product.id,
                //product attributes
            };
        } catch(err) {
            console.error(err);
        }
    }
};