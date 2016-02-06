// require mongoose and bcrypt
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uuid     = require('node-uuid');

var UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  api_key: {
    type: String,
    required: true
  }
});

// method for generating a bcrypted hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// method for generating an api key
UserSchema.methods.generateApiKey = function() {
  return uuid.v4();
};

// method for checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Create the 'User' model based on 'UserSchema'
mongoose.model('User', UserSchema);
