//get port or set to 3210
var port = process.env.PORT || 3210;

//get node environment or set to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var mongoose = require('./config/mongoose');

// create new mongoose connection instance
var db = mongoose();

// create new express connection instance
var app = express();

// use express to listen on specified port
app.listen(port);

// log the server status to console
console.log('Server is running at http://localhost:' + port + '/');

// expose express app for external usage
module.exports = app;
