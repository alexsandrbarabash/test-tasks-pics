const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  name: Schema.Types.String,
  result: Schema.Types.Mixed,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
