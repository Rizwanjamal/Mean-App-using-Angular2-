var express = require('express');
var router = express.Router();
var services = require('../services');
var requireAuthentication = require('./middlewares.js');


/* GET ALL AUTHORS */
router.get('/', requireAuthentication, services.getAuthors);

/* GET SINGLE AUTHOR BY ID */
router.get('/:id', requireAuthentication, services.getAuthor);

/* SAVE AUTHOR */
router.post('/', requireAuthentication, services.saveAuthor);

/* UPDATE AUTHOR */
router.put('/:id', requireAuthentication, services.updateAuthor);

/* DELETE AUTHOR */
router.delete('/:id', requireAuthentication, services.deleteAuthor);


module.exports = router;