const express = require('express');
const router = express.Router();
const loginController = require('../../controller/login/LoginController');

router.post("/", loginController.validateUser);

module.exports = router;
