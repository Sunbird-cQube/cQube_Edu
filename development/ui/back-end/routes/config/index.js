const express = require('express');
const router = express.Router();
const configController = require('../../controller/config/ConfigController');

router.get("/getConfig/:appName/:configName", configController.getConfig);

module.exports = router;
