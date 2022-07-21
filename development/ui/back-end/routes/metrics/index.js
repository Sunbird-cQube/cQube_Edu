const express = require('express');
const router = express.Router();
const metricsController = require('../../controller/metrics/MetricsController');

router.get("/getDashboardMetrics/:appName/:forMenu", metricsController.getDashboardMetrics);
router.get("/getVanityMetrics/:appName/:programId", metricsController.getVanityMetrics);

module.exports = router;
