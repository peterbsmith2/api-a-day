// Load the module dependencies
var	bodyParser  = require('body-parser');
var compression = require('compression');
var	express     = require('express');
var	morgan      = require('morgan');


// Define the Express configuration method
module.exports = function() {

	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compression());
	}

	// Use the 'body-parser' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// Load the routing files
	require('../server/routes/types.server.routes.js')(app);

	// Return the App instance
	return app;
};
