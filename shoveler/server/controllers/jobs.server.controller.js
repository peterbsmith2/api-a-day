var mongoose = require('mongoose');
var Job      = mongoose.model('Job');
var Owner    = mongoose.model('Owner');

exports.postJobs = function(req, res) {
  var newJob = new Job();

  Owner.findOne({_id: req.body.owner_id }, function(err, owner) {
    if (err) { throw err; }

    if (!owner) {
      res.status(403).send({
        description: 'forbidden'
      });
    } else {
      newJob.size = req.body.size;
      newJob.price = req.body.price;
      newJob.notes = req.body.notes;
      newJob.owner_id = owner._id;

      newJob.save(function(err) {
        if (err) { throw err; }
        res.status(201).send({ description: 'job created!' });
      });
    }
  });
};

exports.getJobs = function(req, res) {

  Job.find({}, function(err, jobs) {
    if(err) {
      return res.status(400).send({
        'description': 'error'
      });
    } else {
      res.json(jobs);
    }
  });

};
