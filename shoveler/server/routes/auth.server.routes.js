var auth = require('../../server/controllers/auth.server.controller');

module.exports = function(app) {

  app.route('/api/signup/shoveler')
     .post(auth.shovelerSignup);

  app.route('/api/signup/owner')
     .post(auth.ownerSignup);

};
