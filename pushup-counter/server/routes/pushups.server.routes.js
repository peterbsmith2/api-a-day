var pushups = require('../../server/controllers/pushups.server.controller');

module.exports = function(app) {

  app.route('/pushups')
     .post(pushups.addPushups);

  app.route('/pushups/:pushupId')
     .get(pushups.getPushup)
     .put(pushups.putPushup);

};
