var express = require('express');
var router = express.Router();
var authorService = require('../services/author-service');
var requireAuthentication = require('./middlewares.js');


/* GET ALL AUTHORS */
router.get('/', requireAuthentication, authorService.getAuthors);

/* GET SINGLE AUTHOR BY ID */
router.get('/:id', requireAuthentication, authorService.getAuthor);

/* SAVE AUTHOR */
router.post('/', requireAuthentication, authorService.saveAuthor);

/* UPDATE AUTHOR */
router.put('/:id', requireAuthentication, authorService.updateAuthor);

/* DELETE AUTHOR */
router.delete('/:id', requireAuthentication, authorService.deleteAuthor);



module.exports = router;