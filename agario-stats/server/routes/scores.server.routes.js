
// Load the module dependencies
var scores = require('../../server/controllers/scores.server.controller');

// Define the routes module' method
module.exports = function(app) {

	app.route('/scores')
	   .get(scores.list)
	   .post(scores.create);

  app.route('/scores/:scoreId')
     .get(scores.read)
     .delete(scores.delete);

  app.param('scoreId', scores.scoreById);

};
