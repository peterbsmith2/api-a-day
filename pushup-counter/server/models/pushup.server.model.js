var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Define new PushupSchema
var PushupSchema = new Schema({
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  notes: {
    type: String,
    default: "No Notes"
  },
  time: {
    type: Number,
    required: true
  },
  type_id: {
    type: Number,
    required: true,
    ref: 'Type'
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  }
});

// Create the 'Pushup' Model from Pushup Schema
mongoose.model('Pushup', PushupSchema);
