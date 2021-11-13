const DBURL = 'mongodb://localhost/brainder_db';
const mongoose = require('mongoose');

mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', function () { console.error('There was an error connecting to the Brainer database') });
db.on('open', function () { console.log('Brainer database connection successful') });

module.exports = db;