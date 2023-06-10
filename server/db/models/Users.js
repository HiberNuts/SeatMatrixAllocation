const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
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
      default: "",
    },
    PrincipalName: {
      type: String,
      required: false,
      default: "",
    },
    PhoneNumber: {
      type: String,
      required: false,
      default: "",
    },
    Pincode: {
      type: String,
      required: false,
      default: "",
    },
    District: {
      type: String,
      required: false,
      default: "",
    },
    Website: {
      type: String,
      required: false,
      default: "",
    },
    Autonomous: {
      type: Boolean,
      required: false,
    },
    PersonalDetailFlag: {
      type: Boolean,
      required: false,
    },
    CourseDetails: {
      required: false,
      type: Object,
      default: [],
    },
    CourseDetailFlag: {
      type: Boolean,
      required: false,
    },
    DeclarationFlag: {
      type: Boolean,
      required: false,
    },
    Documents: {
      type: Object,
      required: false,
    },
    DocumentUploadFlag: {
      type: Boolean,
      required: false,
    },
    Phase1Freeze: {
      type: Boolean,
      required: false,
    },
    Phase2Freeze: {
      type: Boolean,
      required: false,
    },
    Booklet: {
      type: Object,
      required: false,
    },
    BankDetails: {
      type: Object,
    },
    BankDetailFlag: {
      type: Boolean,
    },
    bookletDeclaration: {
      type: Boolean,
    },
    docUrl: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = users = mongoose.model("users", userSchema);
