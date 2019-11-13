const { deleteProduct } = require('../Controllers/updates');

module.exports = async function (req, res, next) {
    let info = {
        id: req.params.productId
    };
    deleteProduct(info, function(err, complete) {
        if(err) {
            return next(err);
        }
        if(complete) {
            res.status(200).send({ info: 'completed successfully'})
        }
    })
};