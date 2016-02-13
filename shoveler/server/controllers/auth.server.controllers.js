var mongoose = require('mongoose');
var Owner     = mongoose.model('Owner');

exports.ownerSignup = function(req, res) {

  var newOwner = new Owner();

  // set the owner's credentials
  newOwner.name = req.body.name;
  newOwner.address = req.body.address;
  newOwner.phone = req.body.phone;


  // save the owner
  newOwner.save(function(err) {
      if (err) throw err;
      res.status(201).send({ 'description': 'owner created'});
  });
};

exports.shovelerSignup = function(req, res) {

  var newShoveler = new Shoveler();

  // set the shoveler's credentials
  newShoveler.name = req.body.name;
  newShoveler.age = req.body.age;


  // save the shoveler
  newShoveler.save(function(err) {
      if (err) throw err;
      res.status(201).send({ 'description': 'shoveler created'});
  });
};
