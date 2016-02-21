var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Define new SongSchema
var SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  geniusUrl: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    ref: 'User'
  }
});

// Create the 'Song' Model from Song Schema
mongoose.model('Song', SongSchema);
