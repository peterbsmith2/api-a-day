var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define new ShovelerSchema

var ShovelerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Create the 'Shoveler' Model from Shoveler Schema
mongoose.model('Shoveler', ShovelerSchema);
