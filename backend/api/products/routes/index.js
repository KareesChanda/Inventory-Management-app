const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.delete('/:productId', authMiddleware, require('./deleteProduct'));
router.patch('/:productId', authMiddleware, require('./updateProduct'));
router.get('/', authMiddleware, require('./getProducts'));
router.post('/', authMiddleware, require('./addProduct'));
module.exports = router;