var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Define new 'TypeSchema'

var TypeSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

//Create the Type Model from TypeSchema
mongoose.model('Type', TypeSchema);
