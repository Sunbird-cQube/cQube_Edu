const express = require('express');
const router = express.Router();
const configRoutes = require('./config');
const commonRoutes = require('./common');
const nishthaRoutes = require('./nishtha');
const etbRoutes = require('./etb');
const nasRoutes = require('./nas')
const testRoutes = require('./test')

router.use('/config', configRoutes);
router.use('/common', commonRoutes);
router.use('/nishtha', nishthaRoutes);
router.use('/etb', etbRoutes);
router.use('/nas', nasRoutes);
router.use('/test', testRoutes);

module.exports = router;
