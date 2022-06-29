const express = require('express');
const router = express.Router();
const configController = require('../../controller/config/ConfigController');

router.get("/getMenu", configController.getMenu);
router.get("/getDashboardMenu", configController.getDashboardMenu);

module.exports = router;
