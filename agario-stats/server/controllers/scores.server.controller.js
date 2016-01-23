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
	var Score = new Score(req.body);

	// Set the Score's 'creator' property
	Score.user_id = req.user;

	// Try saving the Score
	Score.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(Score);
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
	res.json(req.Score);
};

// Create a new controller method that updates an existing Score
exports.update = function(req, res) {
	// Get the Score from the 'request' object
	var Score = req.Score;

	// Update the Score fields
	Score.title = req.body.title;
	Score.content = req.body.content;

	// Try saving the updated Score
	Score.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(Score);
		}
	});
};

// Create a new controller method that delete an existing Score
exports.delete = function(req, res) {
	// Get the Score from the 'request' object
	var Score = req.Score;

	// Use the model 'remove' method to delete the Score
	Score.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(Score);
		}
	});
};

// Create a new controller middleware that retrieves a single existing Score
exports.ScoreByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single Score
	Score.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, Score) {
		if (err) return next(err);
		if (!Score) return next(new Error('Failed to load Score ' + id));

		// If an Score is found use the 'request' object to pass it to the next middleware
		req.Score = Score;

		// Call the next middleware
		next();
	});
};

// Create a new controller middleware that is used to authorize an Score operation
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the Score send the appropriate error message
	if (req.Score.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};
