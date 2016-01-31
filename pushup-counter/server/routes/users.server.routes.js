//load the controller
var users = require('../../server/controllers/users.server.controller');

//define the routes moudles method

module.exports = function(app) {
  app.route('/users/:userId')
     .get(users.getUser);

  app.param('userId', users.userById);

};
