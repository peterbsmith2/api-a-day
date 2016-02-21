var auth = require('../../server/controllers/auth.server.controller');

module.exports = function(app) {

  app.route('/api/signup')
     .post(auth.userSignup);

  app.route('/api/login')
     .post(auth.userLogin);

};
