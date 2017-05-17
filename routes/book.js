var express = require('express');
var router = express.Router();
var services = require('../services');
var requireAuthentication = require('./middlewares.js');


/* GET ALL BOOKS */
router.get('/', requireAuthentication, services.getBooks);

/* GET SINGLE BOOK BY ID */
router.get('/:id', requireAuthentication, services.getBook);

/* SAVE BOOK */
router.post('/', requireAuthentication, services.saveBook);

/* UPDATE BOOK */
router.put('/:id', requireAuthentication, services.updateBook);

/* DELETE BOOK */
router.delete('/:id', requireAuthentication, services.deleteBook);


module.exports = router;