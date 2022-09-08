const express = require('express');
const router = express.Router();
const loginRoutes = require('./login');
const configRoutes = require('./config');
const commonRoutes = require('./common');
const testRoutes = require('./test');
const metricsRoutes = require('./metrics');

router.use('/login', loginRoutes);
router.use('/config', configRoutes);
router.use('/common', commonRoutes);
router.use('/test', testRoutes);
router.use('/metrics', metricsRoutes);

module.exports = router;
