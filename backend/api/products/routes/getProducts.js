'use strict';
const { getAllProducts } = require('../Controllers/queries');
module.exports = async function (req, res, next) {
    let page = req.query.page;
    let limit = req.query.pageSize;

    getAllProducts(page, limit, {}, function(err, products) {
        if(err)
            return next(err);
        console.log(products);
        res.status(200).json(products);
    })
};