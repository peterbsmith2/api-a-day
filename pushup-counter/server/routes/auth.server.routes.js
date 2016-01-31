var auth = ('../../server/controllers/auth.server.controller');

module.exports = function(app) {

  app.route('/api/signup')
     .post(auth.newUser);

  app.route('/api/login')
     .post(auth.loginUser);

};
