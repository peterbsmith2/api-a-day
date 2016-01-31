var mongoose = require('mongoose');
var Type = mongoose.model('Type');

exports.getTypes = function(req, res) {

  Type.find({}, function(err, Types) {
    if(err) {
      return res.status(400).send({
        'description': 'error'
      });
    } else {
      res.json(Types);
    }
  });

};

exports.getType = function(req, res) {
  res.json(req.type);
};

exports.typeById = function(req, res, next, id) {
  Type.findById(id, function(err, type) {
    if (err) return next(err);
    if (!type) return next(new Error('Failed to find type ' + id));

    // if a type is found user the req object to pass it to the next middleware
    req.type = type;

    //call next middleware
    next();
  });
};
