var types = require('../../server/controllers/types.server.controller');

module.exports = function(app) {

  app.route('/api/types')
     .get(types.getTypes);

  app.route('/api/types/:typeId')
     .get(types.getType);

  app.param('typeId', types.typeById);

};
