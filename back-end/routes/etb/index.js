const express = require('express');
const router = express.Router();
const etbController = require('../../controller/etb/etbController');

router.get("/getETBMetrics", etbController.getETBMetrics);
router.get("/getStateWiseETBCoverageData", etbController.getStateWiseETBCoverageData);
router.get("/getStateWiseOverallETBCoverageData", etbController.getStateWiseOverallETBCoverageData);

module.exports = router;
