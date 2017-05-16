var express = require('express');
var router = express.Router();
var bookService = require('../services/book-service');
var requireAuthentication = require('./middlewares.js');


/* GET ALL BOOKS */
router.get('/', requireAuthentication, bookService.getBooks);

/* GET SINGLE BOOK BY ID */
router.get('/:id', requireAuthentication, bookService.getBook);

/* SAVE BOOK */
router.post('/', requireAuthentication, bookService.saveBook);

/* UPDATE BOOK */
router.put('/:id', requireAuthentication, bookService.updateBook);

/* DELETE BOOK */
router.delete('/:id', requireAuthentication, bookService.deleteBook);


module.exports = router;