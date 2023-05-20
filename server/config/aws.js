const AWS = require("aws-sdk");
require("dotenv").config();
s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET = "seatmartix";
module.exports = s3;
