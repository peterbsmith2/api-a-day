var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define new JobSchema

var JobSchema = new Schema({
  owner_id: {
    type: String,
    required: true,
    ref: 'Owner'
  },
  notes: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  has_shoveler: {
    type: Boolean,
    required: true,
    default: false
  },
  shoveler_id: {
    type: String,
    ref: 'Shoveler'
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Create the 'Job' Model from Job Schema
mongoose.model('Job', JobSchema);
