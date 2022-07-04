const express = require('express');
const router = express.Router();
const nasController = require('../../controller/nas/nasController');

router.get("/getNasMetrics", nasController.getNasMetrics);

module.exports = router;