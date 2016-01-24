// Load the module dependencies
var User  = require('mongoose').model('User');
var Score = require('mongoose').model('Score');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'User Id already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};


//Create a new User
exports.create = function(req, res) {
	// Create a new User object
	var user = new User(req.body);

	// Try saving the Score
	user.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(User);
		}
	});
};

// Create a new controller method that retrieves a list of Users
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of Users
	User.find(function(err, Users) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Users
			res.json(Users);
		}
	});
};

exports.read = function(req, res) {
	Score.aggregate([
		{ $match: {
			user_id: req.user._id
		}},
		{ $group: {
			_id: req.user._id,
			total_games_played: { $sum: 1 },
			total_mass_eaten: {$sum: '$mass_eaten'},
			average_score: { $avg: '$highest_mass' },
			highest_score: { $max: '$highest_mass' },
			best_survival_time: { $max: '$survival_time' },
			most_cells_eaten: { $max: '$cells_eaten' }
		}}
	], function(err, result) {
		if (err) return res.status(400).send(err);

		User.findById(req.user._id, function(err, user) {
			if (err) {
				return res.status(400).send(err);
			} else {
				if (result[0] === undefined) { res.json(user); }
				else {
					user.total_games_played = result[0].total_games_played;
					user.total_mass_eaten = result[0].total_mass_eaten;
					user.average_score = result[0].average_score;
					user.highest_score = result[0].highest_score;
					user.best_survival_time = result[0].best_survival_time;
					user.most_cells_eaten = result[0].most_cells_eaten;
					user.updated = new Date();
					user.save(function(err) {
						if (err) { return res.status(400).send(err); }
						res.json(user);
					});
				}

			}
		});
	});


};

exports.delete = function(req, res) {
	// Get the Score from the 'request' object
	var user = req.user;

	// Use the model 'remove' method to delete the user
	user.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Score
			res.json(user);
		}
	});
};

exports.scores = function(req, res) {
	Score.find({user_id: req.user}, function(err, scores) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(scores);
		}
	});
};

exports.userById = function(req, res, next, id) {
	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));

		// If an User is found use the 'request' object to pass it to the next middleware
		req.user = user;

		// Call the next middleware
		next();
	});
};
