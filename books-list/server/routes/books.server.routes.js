var books = require('../../server/controllers/books.server.controller');

module.exports = function(app) {

  app.route('/api/books')
     .post(books.postBooks);

  // app.route('/api/books/:bookId')
  //    .get(books.getBooksById)
  //    .put(books.putBooksById)
  //    .delete(books.deleteBooksById);
  //
  // app.route('bookId',books.bookById);

};
