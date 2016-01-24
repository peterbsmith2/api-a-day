// Load the module dependencies
var mongoose = require('mongoose');
var	Schema   = mongoose.Schema;

// Define a new 'UserSchema'
var UserSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: 'ID is required'
  },
  total_games_played: Number,
  total_mass_eaten: Number,
  average_score: Number,
  highest_score: Number,
  best_survival_time: Number,
  most_cells_eaten: Number,
	created: {
		type: Date,
		default: Date.now
	},
  updated: {
    type: Date,
    default: Date.now
  }
});

//This model does not at this time include agario's facebook auth model

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
