var songs = require('../../server/controllers/songs.server.controller');

module.exports = function(app) {

  app.route('/api/songs')
     .post(songs.postSongs)
     .get(songs.getSongs);

  app.route('/api/songs/:songId')
     .get(songs.getOneSong)
     .put(songs.putOneSong)
     .delete(songs.deleteOneSong);


};
