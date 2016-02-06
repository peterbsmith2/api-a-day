var config   = require('./config');
var mongoose = require('mongoose');

//define mongoose configuration method
module.exports = function() {
  // use mongoose to connect to MongoDB
  var db = mongoose.connect(config.db);

  // load the application models
  require('../server/models/book.server.model');
  require('../server/models/user.server.model');

  //return the mongoose connection instance
  return db;
};
