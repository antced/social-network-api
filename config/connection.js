const { connect, connection } = require('mongoose');
// connect to the database
connect('mongodb://localhost/socialmediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
