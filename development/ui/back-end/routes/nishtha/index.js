const express = require('express');
const router = express.Router();
const nishthaController = require('../../controller/nishtha/NishthaController');

router.get("/getStateWiseEnrollmentData/:version", nishthaController.getStateWiseEnrollmentData);

module.exports = router;
