var port = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express  = require('./config/express');
var mongoose = require('./config/mongoose');

//Create new mongoose connection instance
var db = mongoose();

//create new Express apllication instance
var app = express();

// Use the express app instance to listen on specified port
app.listen(port);

//Log the server status to the console
console.log('Server running at http://localhost:' + port + '/');

// expose express application for external usage
module.exports = app;
