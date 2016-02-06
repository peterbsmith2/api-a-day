var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define new BookSchema

var BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  }
});

// Create the 'Book' Model from Book Schema
mongoose.model('Book', BookSchema);
