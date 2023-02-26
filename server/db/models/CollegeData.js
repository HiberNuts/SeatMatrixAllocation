const mongoose = require('mongoose');

const CollegeDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  code:{

     type: String,
    required: true
  }
});

module.exports = College = mongoose.model('CollegeData', CollegeDataSchema);