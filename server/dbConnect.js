const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config.js');

exports.db_connection = () => {
  return mongoose.connect(dbConfig.db_url);
}

