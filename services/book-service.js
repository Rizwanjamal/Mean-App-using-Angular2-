var mongoose = require('mongoose');
var Book = require('../models/Book.js');

let bookService = {
    getBooks           : getBooks,
    getBook            : getBook,
    saveBook           : saveBook,
    updateBook         : updateBook,
    deleteBook         : deleteBook
};


/* GET ALL BOOKS */
function getBooks(req, res, next){
    Book.find()
    .populate('author')
    .exec(function(err, books){
        if(err) return next(err);
        res.json(books);
    });
}


/* GET SINGLE BOOK BY ID */
function getBook(req, res, next){
    Book.findById(req.params.id)
    .populate('author')
    .exec(function(err, book){
        if(err) return next(err);
        res.json(book);
    });
}


/* SAVE BOOK */
function saveBook(req, res, next){
    req.checkBody("isbn", "The ISBN must be a valid version of 10 or 13 !").isISBN();
    req.checkBody("title", "The title must be of minimum 3 characters & maximum 30 characters !").isLength({min:3, max: 30});
    req.checkBody("author", "The author must be store with a valid mongoId !").isMongoId();
    req.checkBody("publisher", "The publisher must be of minimum 3 characters & maximum 10 characters !").isLength({min:3, max: 10});
    req.checkBody("price", "The price must be Numeric !").isNumeric();

    let errors = req.validationErrors();
    if(errors && errors.length){
        return next({"status": 400, "errorMessage": errors[0]});
    }
   
        Book.create(req.body, function(err, book){
        if(err) return next(err);
        res.json(book);
        });
}


/* UPDATE BOOK */
function updateBook(req, res, next ){
    req.checkBody("isbn", "The ISBN must be a valid version of 10 or 13 !").isISBN();
    req.checkBody("title", "The title must be of minimum 3 characters & maximum 30 characters !").isLength({min:3, max: 30});
    req.checkBody("author", "The author must be store with a valid mongoId !").isMongoId();
    req.checkBody("publisher", "The publisher must be of minimum 3 characters & maximum 10 characters !").isLength({min:3, max: 10});
    req.checkBody("price", "The price must be Numeric !").isNumeric();

    let errors = req.validationErrors();
    if(errors){
       return res.json(errors);
    }
    else {
        Book.findByIdAndUpdate(req.params.id, req.body, function (err, book) {
        if (err) return next(err);
        res.json(book);
        });
    } 
}


/* DELETE BOOK */
function deleteBook(req, res, next){
    Book.findByIdAndRemove(req.params.id, req.body, function (err, book) {
        if (err) return next(err);
        res.json(book);
    });
}

module.exports = bookService;