var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

// Define a new 'ScoreSchema'
var ScoreSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
  highest_mass: Number,
  mass_eaten: Number,
  cells_eaten: Number,
  survival_time: Number, //more?
  leaderboard_time: Number, //more?
  top_position: Number,
  nickname: String,
	user_id: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// Create the 'Score' model out of the 'ScoreSchema'
mongoose.model('Score', ScoreSchema);
