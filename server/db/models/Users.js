const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ccode: {
    type: String,
    required: true,
  },
  CollegePassword: {
    type: String,
    required: true,
  },
  can: {
    type: String,
    required: false,
  },
  Category: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: false,
  },
  PrincipalName: {
    type: String,
    required: false,
  },
  PersonalDetailFlag: {
    type: Boolean,
  },
});

module.exports = users = mongoose.model("users", userSchema);
