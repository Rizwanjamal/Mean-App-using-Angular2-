var mongoose = require('mongoose');
var Author = require('../models/Author.js');


class AuthorService{
    
    /* GET ALL AUTHORS */
    static getAuthors(req, res, next){
        Author.find(function(err, authors){
            if(err) return next(err);
            res.json(authors);
        });
    }

    /* GET SINGLE AUTHOR BY ID */
    static getAuthor(req, res, next){
        Author.findById(req.params.id, function(err, author){
            if(err) return next(err);
            res.json(author);
        });
    }

    /* SAVE AUTHOR */
    static saveAuthor(req, res, next){
        req.checkBody("name", "The Author name must be of minimum 3 characters & maximum 15 characters !").isLength({min:3, max: 15});
        req.checkBody("ranking", "The ranking must be in a range from 1 to 10 !").isInt({min:1, max: 10});
        req.checkBody("total_books", "The quantity of total books must be Numeric !").isNumeric();
        req.checkBody("awards", "The quantity of total awards must be Numeric !").isNumeric();

        let errors = req.validationErrors();
        if(errors && errors.length){
            return next({"status": 400, "errorMessage": errors[0]});
        }
        else {
            Author.create(req.body, function(err, author){
            if(err) return next(err);
            res.json(author);
            });    
        }
    }

    /* UPDATE AUTHOR */
    static updateAuthor(req, res, next ){
        req.checkBody("name", "The Author name must be of minimum 3 characters & maximum 15 characters !").isLength({min:3, max: 15});
        req.checkBody("ranking", "The ranking must be in a range from 1 to 10 !").isInt({min:1, max: 10});
        req.checkBody("total_books", "The quantity of total books must be Numeric !").isNumeric();
        req.checkBody("awards", "The quantity of total awards must be Numeric !").isNumeric();

        let errors = req.validationErrors();
        if(errors){
            return res.json(errors);
        } 
        else {
            Author.findByIdAndUpdate(req.params.id, req.body, function (err, author) {
            if (err) return next(err);
            res.json(author);
            });
        }
    }


    /* DELETE AUTHOR */
    static deleteAuthor(req, res, next){
        Author.findByIdAndRemove(req.params.id, req.body, function (err, author) {
        if (err) return next(err);
        res.json(author);
    });
    }
  
}

 module.exports = AuthorService;