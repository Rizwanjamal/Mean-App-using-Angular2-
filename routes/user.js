var express = require('express');
var router = express.Router();
var services = require('../services');
var requireAuthentication = require('./middlewares.js');

/* GET LOGIN */
router.post('/login', services.login);


module.exports = router;
