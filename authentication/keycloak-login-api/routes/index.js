const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController/loginController');
const changePassword = require('../controller/loginController/changePassword')
router.use("/", loginController);
router.use("/totp", loginController )
router.use('/changePassword', changePassword);

module.exports = router;