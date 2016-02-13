var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define new OwnerSchema

var OwnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Create the 'Owner' Model from Owner Schema
mongoose.model('Owner', OwnerSchema);
