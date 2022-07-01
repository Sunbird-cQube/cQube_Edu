const express = require('express');
const router = express.Router();
const configRoutes = require('./config');
const nishthaRoutes = require('./nishtha');
const etbRoutes = require('./etb');

router.use('/config', configRoutes);
router.use('/nishtha', nishthaRoutes);
router.use('/etb', etbRoutes);

module.exports = router;
