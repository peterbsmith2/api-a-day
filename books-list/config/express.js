//Load modules
var bodyParser  = require('body-parser');
var compression = require('compression');
var express     = require('express');
var morgan      = require('morgan');

//Define the Express configuration method
module.exports = function() {

  // create express app instance
  var app = express();

  // Use NODE_ENV variable to activate proper middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  // use body-parser middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Load routing files
  // require('../server/routes/books.server.routes')(app);
  // require('../server/routes/users.server.routes')(app);

  //return the app
  return app;
};
