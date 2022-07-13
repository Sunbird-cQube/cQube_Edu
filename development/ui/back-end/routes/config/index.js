const express = require('express');
const router = express.Router();
const configController = require('../../controller/config/ConfigController');

router.get("/getConfig/:appName/:configName", configController.getConfig);
router.get("/getMetrics/:appName/:configName", configController.getMetrics);
router.get("/getVanityMetrics/:appName/:configName", configController.getVanityMetrics);

module.exports = router;
