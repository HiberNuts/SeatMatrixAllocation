// routes/api/Auths.js

const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const secret = "6$Sz249eF18@MKy1N";
var { expressjwt: ejwt } = require("express-jwt");
var multer = require("multer");
const s3 = require("../../config/aws");
// Load User model
const users = require("../../db/models/Users");

var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

var multipleUpload = multer({ storage: storage }).fields([
  { name: "seatMatrix" },
  { name: "AICTEApproval" },
  { name: "AUAffiliation" },
  { name: "Accredation" },
  { name: "Autonomous" },
]);
var upload = multer({ storage: storage }).single("file");

// @route GET api/Auths/:id
// @description Get single Auth by id
// @access Public
UserRouter.get("/getById/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ noAuthfound: "No user found" }));
});

UserRouter.get("/", async (req, res) => {
  const data = await users.find({});
  res.json(data);
});

UserRouter.post("/", (req, res) => {
  users
    .create(req.body)
    .then((users) => res.json({ msg: "users added successfully" }))
    .catch((err) => res.status(400).json(err));
});

// Login auth and generate JWT
UserRouter.post("/login", async (req, res) => {
  const { ccode, CollegePassword } = req.body;
  try {
    // Find the auth with the given email
    console.log(ccode);
    const auth = await users.findOne({ ccode: ccode });
    console.log(auth);

    if (!auth) {
      return res.status(400).json({ message: "User not found" });
    }

    //Compare the password with the hashed password
    const match = CollegePassword === auth.CollegePassword;
    if (!match) {
      if (auth.CollegePassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: auth.id, ccode: auth.ccode, collegeName: auth.can }, secret);
        res.json({ token: token, resetReq: true });
      }
    } else {
      // Generate JWT
      const token = jwt.sign({ id: auth.id, ccode: auth.ccode, collegeName: auth.can }, secret);
      res.json({ token: token, resetReq: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/resetPasswordInitial", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    console.log(req.auth);
    const auth = await users.findOneAndUpdate({ ccode: req.auth.ccode }, req.body);

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/collegeData", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    const auth = await users.findById(req.auth.id);

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(auth);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.post("/personalDetail", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { PrincipalName, Email, PhoneNumber, Pincode, District, Website, Autonomous } = req.body;
    console.log(req.body);
    if (!PrincipalName || !Email || !PhoneNumber || !Pincode || !District || !Website) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        PrincipalName: PrincipalName,
        Email: Email,
        PhoneNumber: PhoneNumber,
        Pincode: Pincode,
        District: District,
        Website: Website,
        Autonomous: Autonomous,
        PersonalDetailFlag: true,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.post(
  "/DocUpload",
  multipleUpload,
  ejwt({ secret: secret, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const { files } = req;
      let allFiles = [];
      Object.values(files).map((file) => {
        allFiles.push(file[0]);
      });

      const College = await users.findById(req.auth.id);
      let document = College.Documents ? College.Documents : {};
      for (let i = 0; i < allFiles.length; i++) {
        var params = {
          Bucket: "tneaseatmatrix",
          Body: allFiles[i].buffer,
          Key: `${req.auth.ccode}/${allFiles[i].fieldname}.pdf`,
        };

        await s3.upload(params, async function (err, data) {
          if (err) {
            console.log("Error", err);
          }
          if (data) {
            document[allFiles[i].fieldname] = true;
            await users.findByIdAndUpdate(req.auth.id, {
              Documents: document,
            });
          }
        });
      }
      await users.findByIdAndUpdate(req.auth.id, {
        DocumentUploadFlag: true,
      });
      res.json({ status: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

UserRouter.get("/documents", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    var params = {
      Bucket: "tneaseatmatrix",
      Delimiter: "/",
      Prefix: `${req.auth.ccode}/`,
    };
    let keys = [];
    let signedUrls = {};
    await s3.listObjectsV2(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        res.json({ status: false, error: err });
      } else {
        data.Contents.forEach((con) => keys.push(con["Key"]));
        for (let i = 0; i < keys.length; i++) {
          var params = {
            Bucket: "tneaseatmatrix",
            Key: keys[i],
            Expires: 500,
          };
          var url = s3.getSignedUrl("getObject", params);
          signedUrls[keys[i].split("/")[1]] = url;
        }
        res.send(signedUrls);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// *Route for admin panel dashboard - jermey*

UserRouter.get("/list", async (req, res) => {
  try {
    const colleges = await users.find({});
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/list/college/:collegeCode", async (req, res) => {
  try {
    const collegeCode = req.params.collegeCode;
    const college = await users.find({ ccode: collegeCode });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/list/filled", async (req, res) => {
  try {
    const college = await users.find({ DeclarationFlag: true });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.get("/list/notfilled", async (req, res) => {
  try {
    const college = await users.find({ DeclarationFlag: null });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/unlock/:collegeCode", async (req, res) => {
  try {
    const collegeCode = req.params.collegeCode;
    const college = await users.findOneAndUpdate({ ccode: collegeCode }, { FreezeFlag: false });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Setting CourseDetails
UserRouter.post("/setCourseDetails", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { CourseDetails } = req.body;
    console.log(req.body);
    if (!CourseDetails) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        CourseDetails: CourseDetails,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = UserRouter;
