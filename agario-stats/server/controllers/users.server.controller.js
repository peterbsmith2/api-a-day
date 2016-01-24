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
	res.json(req.user);
};

exports.scores = function(req, res) {
	Score.find({ user_id: req.user._id }, function(err, scores) {
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

	User.findById(id, function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('failed to find user ' + id));

		req.user = user;

		next();
	});

};
