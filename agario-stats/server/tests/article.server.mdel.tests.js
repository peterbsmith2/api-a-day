var app      = require('../../server.js');
var mongoose = require('mongoose');
var should   = require('should');
var Score    = mongoose.model('Score');
var User     = mongoose.model('User');

var score;
var user;

describe('Score Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      _id: 'Guest_52254808'
    });

    user.save(function() {
      score = new Score({
        highest_mass: 100,
        mass_eaten: 110,
        cells_eaten: 1,
        survival_time: 100,
        leaderboard_time: 0,
        top_position: 43,
        nickname: 'unnamed',
        user_id: user._id
      });

      done();
    });
  });

  describe('Testing the save method', function() {
    it('Should be able to save without problems', function() {
      score.save(function(err) {
        should.not.exist(err);
      });
    });

    it('Should not be able to save a score without a user_id', function() {
      score.user_id = null;

      score.save(function(err) {
        should.exist(err);
      });
    });
  });

  afterEach(function(done) {
    Score.remove(function() {
      User.remove(function() {
        done();
      });
    });
  });
});
