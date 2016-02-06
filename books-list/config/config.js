// Load the correct configuration file according to the NOD_ENV variable
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
