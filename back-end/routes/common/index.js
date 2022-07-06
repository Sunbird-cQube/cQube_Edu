const express = require('express');
const router = express.Router();
const commonController = require('../../controller/common/CommonController');

router.get("/getConfig/:appName/:configName", commonController.getConfig);

module.exports = router;
