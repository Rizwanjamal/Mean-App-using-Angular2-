var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
var requireAuthentication = require('./middlewares.js');

/* GET LOGIN */
router.post('/login', userService.login);


module.exports = router;
