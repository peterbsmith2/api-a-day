var auth = ('../../server/controllers/auth.server.controller');

module.exports = function(app) {

  app.route('/signup')
     .post(auth.newUser);

  app.route('/login')
     .post(auth.loginUser);

};
