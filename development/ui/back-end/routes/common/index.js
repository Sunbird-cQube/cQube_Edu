const express = require('express');
const router = express.Router();
const commonController = require('../../controller/common/CommonController');

router.post("/getReportData/:appName/:dataSourceName/:reportName/:reportType", commonController.getReportData);

module.exports = router;
