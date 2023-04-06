const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

s3 = new AWS.S3({
  accessKeyId: "AKIA34NFNV3U7CZMH3U2",
  secretAccessKey: "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",
});

const BUCKET = "tneaseatmatrix";
var filePath = "./data/file.txt";

// var params = {
//   Bucket: BUCKET,
//   Body: fs.createReadStream(filePath),
//   Key: "folder/" + Date.now() + "_" + path.basename(filePath),
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });

module.exports = s3;
