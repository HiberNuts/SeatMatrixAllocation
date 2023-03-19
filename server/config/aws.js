const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: "AKIAWCHQTTX3OULGTPVY",
  secretAccessKey: "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",
});

const BUCKET = "tneaseatmatrix";
var filePath = "./data/file.txt";

var params = {
  Bucket: "tneaseatmatrix",
  Body: fs.createReadStream(filePath),
  Key: "folder/" + Date.now() + "_" + path.basename(filePath),
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});
