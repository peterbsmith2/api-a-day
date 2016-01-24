// Load the module dependencies
var mongoose = require('mongoose'),
	Score = mongoose.model('Score');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new Scores
exports.create = function(req, res) {
	// Create a new Score object
	var score = new Score(req.body);

	// Try saving the Score
	score.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(score);
		}
	});
};

// Create a new controller method that retrieves a list of Scores
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of Scores
	Score.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, Scores) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(Scores);
		}
	});
};

// Create a new controller method that returns an existing Score
exports.read = function(req, res) {
	res.json(req.score);
};

// Create a new controller method that delete an existing Score
exports.delete = function(req, res) {
	// Get the Score from the 'request' object
	var score = req.score;

	// Use the model 'remove' method to delete the Score
	score.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(score);
		}
	});
};

// Create a new controller middleware that retrieves a single existing Score
exports.scoreById = function(req, res, next, id) {
	// Use the model 'findById' method to find a single Score
	Score.findById(id, function(err, score) {
		if (err) return next(err);
		if (!score) return next(new Error('Failed to load Score ' + id));

		// If an Score is found use the 'request' object to pass it to the next middleware
		req.score = score;

		// Call the next middleware
		next();
	});
};
