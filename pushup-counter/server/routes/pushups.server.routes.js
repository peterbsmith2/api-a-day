var pushups = require('../../server/controllers/pushups.server.controller');

module.exports = function(app) {

  app.route('/api/pushups')
     .post(pushups.addPushups);

  app.route('/api/pushups/:pushupId')
     .get(pushups.getPushup)
     .put(pushups.putPushup);

};
