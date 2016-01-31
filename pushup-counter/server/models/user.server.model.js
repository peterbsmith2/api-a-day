// require mongoose
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Create 'UserSchema'
var UserSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//Create the 'User' model based on 'UserSchema'
mongoose.model('User', UserSchema);
