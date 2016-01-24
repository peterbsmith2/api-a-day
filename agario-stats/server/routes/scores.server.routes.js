
// Load the module dependencies
var scores = require('../../server/controllers/scores.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'signup' routes
	app.route('/scores/')
	   .get(scores.list)
	   .post(scores.create);
};
