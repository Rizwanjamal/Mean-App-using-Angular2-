var mongoose = require('mongoose');

var AuthorSchema = new mongoose.Schema({
    name : String,
    ranking : Number,
    total_books : Number,
    awards : Number
})

module.exports = mongoose.model('Author', AuthorSchema);