//index manifest file for all profile routes
const express = require('express');
const authMiddleware = require('../../Helpers/authMiddleware');
const router = express.Router();

router.get('/:userId', authMiddleware, require('./getUser'));

module.exports = router;