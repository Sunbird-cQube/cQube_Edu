const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController/loginController');

router.use("/", loginController);
router.use("/totp", loginController )

module.exports = router;