var auth = require('../../server/controllers/auth.server.controller');

module.exports = function(app) {

  app.route('/api/register')
     .post(auth.newUser);

  app.route('/api/login')
     .post(auth.loginUser);

};
