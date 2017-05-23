var bookService = require('./book-service');
var authorService = require('./author-service');
var userService = require('./user-service');


//Exported Members

module.exports.getBooks       =    bookService.getBooks;
module.exports.getBook        =    bookService.getBook;
module.exports.saveBook       =    bookService.saveBook;
module.exports.updateBook     =    bookService.updateBook;
module.exports.deleteBook     =    bookService.deleteBook;
module.exports.getAuthors     =    authorService.getAuthors;
module.exports.getAuthor      =    authorService.getAuthor;
module.exports.saveAuthor     =    authorService.saveAuthor;
module.exports.updateAuthor   =    authorService.updateAuthor;
module.exports.deleteAuthor   =    authorService.deleteAuthor;
module.exports.login          =    userService.login;