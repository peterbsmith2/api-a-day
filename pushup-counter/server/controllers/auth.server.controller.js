var mongoose = require('mongoose');
var User     = mongoose.model('User');

exports.newUser = function(req, res) {

  User.findOne({ _id: req.body._id }, function(err, user) {
    // If an error occurs continue to the next middleware
    if (err) { return next(err); }

    // If a user was found, send erro
    if (user) {
      res.status(409).send({'description': 'User already exists'});
    } else {
      // if there is no user with that id
      // create the user
      var newUser            = new User();

      // set the user's local credentials
      newUser._id    = req.body._id;
      newUser.password = newUser.generateHash(req.body.password);
      newUser.api_key = newUser.generateApiKey();

      // save the user
      newUser.save(function(err) {
          if (err) throw err;
          res.status(201).send({ 'description': 'user created'});
      });
    }
  });
};

exports.loginUser = function(req, res) {

  User.findOne({_id: req.body._id}, function(err, user) {
    if (err) return next(err);

    if (!user) {
      res.status(401).send({ description: 'unauthorized' });
    } else if (!user.validPassword(req.body.password)) {
      res.status(401).send({ description: 'unauthorized' });
    } else {
      res.status(200).send(user);
    }
  });

};
