var types = require('../../server/controllers/types.server.controller');

module.exports = function(app) {

  app.route('/types')
     .get(types.getTypes);

  app.route('/types/:typeId')
     .get(types.getType);

  app.param('typeId', types.typeById);

};
