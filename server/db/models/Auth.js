const mongoose = require('mongoose');

const CollegeAuthSchema = new mongoose.Schema({
  CollegeCode: {
    type: String,
    required: true
  },
  CollegePassword: {
    type: String,
    required: true
  },
  CollegeData_id:{
    type: String,
    required: false

  }
});

module.exports = Auth = mongoose.model('auth', CollegeAuthSchema);