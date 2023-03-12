const mongoose = require("mongoose");

const CollegeDataSchema = new mongoose.Schema({
  can: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  ccode: {
    type: String,
    required: true,
  },
});

module.exports = College = mongoose.model("CollegeData", CollegeDataSchema);
