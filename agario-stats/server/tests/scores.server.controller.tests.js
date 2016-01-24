// var app      = require('../../server');
// var mongoose = require('mongoose');
// var request  = require('supertest');
// var should   = require('should');
// var Score    = mongoose.model('Score');
// var User     = mongoose.model('User');
//
// var user;
// var score;
//
// describe('Scores Controller Unit Tests:', function() {
//   beforeEach(function(done) {
//     user = new User({
//       _id: 'Guest_52254808'
//     });
//
//     user.save(function() {
//       score = new Score({
//         highest_mass: 100,
//         mass_eaten: 110,
//         cells_eaten: 1,
//         survival_time: 100,
//         leaderboard_time: 0,
//         top_position: 43,
//         nickname: 'unnamed',
//         user_id: user._id
//       });
//
//       score.save(function(err) {
//         done();
//       });
//     });
//   });
//
//   describe('Testing the GET methods', function() {
//     it('Should be able to get the list of scores', function(done) {
//       request(app).get('/scores')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function(err, res) {
//           res.body.should.be.an.Array.and.have.lengthOf(1);
//           res.body[0].should.have.property('highest_mass', score.highest_mass);
//           done();
//         });
//     });
//
//     it('Should be able to get the specific score', function(done) {
//       request(app).get('/scores/' + score._id)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function(err, res) {
//           res.body.should.be.an.Object.and.have.property('highest_mass', score.highest_mass);
//
//           done();
//         });
//     });
//   });
//
//   afterEach(function(done) {
//     Score.remove().exec();
//     User.remove().exec();
//     done();
//   });
// });
