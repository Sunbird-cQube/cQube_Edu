const express = require('express');
const router = express.Router();
const configRoutes = require('./config');
const commonRoutes = require('./common');
const nishthaRoutes = require('./nishtha');
const etbRoutes = require('./etb');
const nasRoutes = require('./nas')

router.use('/config', configRoutes);
router.use('/common', commonRoutes);
router.use('/nishtha', nishthaRoutes);
router.use('/etb', etbRoutes);
router.use('/nas', nasRoutes);

module.exports = router;
