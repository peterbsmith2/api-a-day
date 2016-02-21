var mongoose = require('mongoose');
var User     = mongoose.model('User');

exports.userSignup = function(req, res) {

  User.findOne({ _id: req.body._id }, function(err, user) {
    // If an error occurs continue to the next middleware
    if (err) { return next(err); }

    // If a user was found, send erro
    if (user) {
      res.status(409).send({'message': 'User already exists'});
    } else {
      // if there is no user with that id
      // create the user
      var newUser            = new User();

      // set the user's credentials
      newUser._id    = req.body._id;
      newUser.password = newUser.generateHash(req.body.password);

      // save the user
      newUser.save(function(err) {
          if (err) throw err;
          res.status(201).send();
      });
    }
  });
};

exports.userLogin = function(req, res) {

  User.findOne({_id: req.body._id}, function(err, user) {
    if (err) return next(err);

    if (!user) {
      res.status(401).send({ message: 'unauthorized' });
    } else if (!user.validPassword(req.body.password)) {
      res.status(401).send({ message: 'unauthorized' });
    } else {
      res.status(200).send(user);
    }
  });

};
