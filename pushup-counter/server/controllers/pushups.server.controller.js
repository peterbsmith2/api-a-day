var mongoose = require('mongoose');
var Pushup = mongoose.model('Pushup');
var User   = mongoose.model('User');

exports.addPushups = function(req, res) {
  var newPushup = new Pushup();

  User.findOne({api_key: req.query.api_key }, function(err, user){
    if (err) { throw err; }

    if (!user) {
      return res.status(403).send({
        description: 'forbidden'
      });
    }

    newPushup.user_id = user._id;
    newPushup.count   = req.body.count;
    newPushup.time    = req.body.time;
    newPushup.type_id = req.body.type_id;

    newPushup.save(function(err) {
      if (err) throw err;
      res.status(201).send({ 'description': 'pushups added!' });
    });
  });
};

exports.getPushup = function(req, res) {

  User.findOne({api_key: req.query.api_key }, function(err, user){
    if (err) { throw err; }

    if (!user) {
      res.status(403).send({
        description: 'forbidden'
      });
    }

    res.status(200).send(req.pushup);
  });


};

exports.putPushup = function(req, res) {
  User.findOne({api_key: req.query.api_key }, function(err, user){
    if (err) { throw err; }

    if (!user) {
      res.status(403).send({
        description: 'forbidden'
      });
    }

    Pushup.findByIdAndUpdate({ _id: req.pushup._id }, req.body, function(err, pushup) {
      if (err) {throw err; }
      res.status(201).send({ 'description': 'pushup record updated!'});
    });

  });
};

exports.pushupById = function(req, res, next, id) {
  Pushup.findById(id, function(err, pushup) {
    if (err) return next(err);
    if (!pushup) return next(new Error('Failed to find pushup ' + id));

    console.log(pushup);
    // if a type is found user the req object to pass it to the next middleware
    req.pushup = pushup;

    //call next middleware
    next();
  });
};
