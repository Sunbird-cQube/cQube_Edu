const express = require('express');
const router = express.Router();
const commonController = require('../../controller/common/CommonController');

router.post("/getReportData", commonController.getReportData);

module.exports = router;
