const { addProduct } = require('../Controllers/posts');

module.exports = async function (req, res, next) {
    let info = {
        name: req.body.name,
        amount: parseInt(req.body.amount),
        price: parseFloat(req.body.price)
    };
    addProduct(info, function(err, product) {
        if(err)
            return next(err);
        res.status(200).json(product);
    })
};