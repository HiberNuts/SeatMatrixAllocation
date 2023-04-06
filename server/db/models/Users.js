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
  PhoneNumber: {
    type: String,
    required: false,
  },
  Pincode: {
    type: String,
    required: false,
  },
  District: {
    type: String,
    required: false,
  },
  Website: {
    type: String,
    required: false,
  },
  Autonomous: {
    type: Boolean,
    required: false,
  },
  PersonalDetailFlag: {
    type: Boolean,
    required: false,
  },
  CourseDetails:{
    required:false,
    type:Object
  },
  CourseDetailFlag: {
    type: Boolean,
    required: false,
  },
  DeclarationFlag: {
    type: Boolean,
    required: false,
  },
  FreezeFlag: {
    type: Boolean,
    required: false,
  },
});

module.exports = users = mongoose.model("users", userSchema);
