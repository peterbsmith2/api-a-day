var mongoose = require('mongoose');
var User     = mongoose.model('User');

exports.newUser = function(req, res) {

  User.findOne({ _id: req.body._id }, function(err, user) {
    // if an error occurs continue to the next middleware
    if (err) { return next(err); }

    // if a user is found send error
    if (user) {
      res.status(409).send({ description: 'User already exists' });
    } else {
      // if theres no user with that id
      // create the user
      var newUser = new User();

      newUser._id      = req.body._id;
      newUser.password = newUser.generateHash(req.body.password);
      newUser.api_key  = newUser.generateApiKey();

      // save the user
      newUser.save(function(err) {
        if (err) { throw err; }
        res.status(201).send( { description: 'user created!' });
      });
    }
  });
};

exports.loginUser = function(req, res) {

  User.findOne({_id: req.body._id}, function(err, user) {
    if (err) return next(err);

    if (!user) {
      res.status(403).send({ description: 'Forbidden!' });
    } else if (!user.validPassword(req.body.password)) {
      res.status(403).send({ description: 'Forbidden! Id/password incorrect!'});
    } else {
      res.status(200).send(user);
    }
  });

};
