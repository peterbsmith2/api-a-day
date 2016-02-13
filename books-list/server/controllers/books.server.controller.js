var mongoose = require('mongoose');
var Book     = mongoose.model('Book');
var User     = mongoose.model('User');

exports.postBooks = function(req, res) {
  var newBook = new Book();

  User.findOne({api_key: req.query.api_key }, function(err, user) {
    if (err) { throw err; }

    if (!user) {
      res.status(403).send({
        description: 'forbidden'
      });
    }

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.user_id = user._id;

    newBook.save(function(err) {
      if (err) { throw err; }
      res.status(201).send({ description: 'book created!' });
    });

  });
};
