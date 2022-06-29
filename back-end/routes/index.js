const express = require('express');
const router = express.Router();
const configRoutes = require('./config');
const nishthaRoutes = require('./nishtha');

router.use('/config', configRoutes);
router.use('/nishtha', nishthaRoutes);

module.exports = router;
