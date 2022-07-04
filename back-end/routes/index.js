const express = require('express');
const router = express.Router();
const configRoutes = require('./config');
const nishthaRoutes = require('./nishtha');
const etbRoutes = require('./etb');
const nasRoutes = require('./nas')

router.use('/config', configRoutes);
router.use('/nishtha', nishthaRoutes);
router.use('/etb', etbRoutes);
router.use('/nas', nasRoutes);

module.exports = router;
