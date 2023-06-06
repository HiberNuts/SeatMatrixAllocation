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
const nodemailer = require("nodemailer");

const BUCKET = "seatmartix";

var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: "tnea@2023",
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

var multipleUpload = multer({ storage: storage }).fields([
  { name: "seatMatrix" },
  { name: "AICTEApproval" },
  { name: "AUAffiliation" },
  { name: "Accredation" },
  { name: "Autonomous" },
  { name: "bookletDeclaration" },
  { name: "Minority" },
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

// UserRouter.get("/", async (req, res) => {
//   const data = await users.find({});
//   res.json(data);
// });

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
    const auth = await users.findOne({ ccode: ccode });
    if (!auth) {
      return res.status(400).json({ message: "User not found" });
    }

    //Compare the password with the hashed password
    const match = CollegePassword === auth.CollegePassword;
    if (!match) {
      if (auth.CollegePassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        if (CollegePassword != ccode) {
          return res.status(400).json({ message: "Invalid credentials" });
        } else {
          const token = jwt.sign({ id: auth.id, ccode: auth.ccode, collegeName: auth.can }, secret);
          res.json({ token: token, resetReq: true });
        }
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
    const auth = await users.findOneAndUpdate({ ccode: req.auth.ccode }, req.body);

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: true });
  } catch (err) {
    console.log("Error in resetPassword", err);
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
    console.log("Error in collegeData", err);
    res.status(500).json(err);
  }
});

UserRouter.post("/personalDetail", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { PrincipalName, Email, PhoneNumber, Pincode, District, Website, Autonomous } = req.body;
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
    console.log("Error in personalDetail", err);
    res.status(500).json(err);
  }
});
UserRouter.post("/bookletData", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { Booklet } = req.body;
    if (!Booklet) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        "Booklet.Personal": Booklet,
        "Booklet.PersonalDetailFlag": true,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/bankData", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { BankDetails } = req.body;
    if (!BankDetails) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        BankDetails: BankDetails,
        BankDetailFlag: true,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/bookletCourse", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { CourseDetails } = req.body;
    if (!CourseDetails) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        "Booklet.CourseDetails": CourseDetails,
        "Booklet.CourseDetailFlag": true,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/freezeBooklet", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { freeze } = req.body;
    if (!freeze) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        "Booklet.Frozen": freeze,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/Phase1Freeze", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { freeze, Course } = req.body;
    if (freeze == null || !Course) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        Phase1Freeze: freeze,
        CourseDetails: Course,
      });
      res.json({ status: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/Phase2Freeze", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const user = await users.findByIdAndUpdate(req.auth.id, {
      Phase2Freeze: true,
    });
    res.json({ status: true });
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/bookletInfrastructre", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { Infra } = req.body;
    if (!Infra) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        "Booklet.Infrastructure": Infra,
        "Booklet.InfrastructureFlag": true,
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
          Bucket: BUCKET,
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
      console.log("Error in Doc upload", err);
      res.status(500).json(error);
    }
  }
);

UserRouter.post("/deleteDoc", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { key } = req.body;
    var params = { Bucket: BUCKET, Key: `${req.auth.ccode}/${key}.pdf` };
    s3.deleteObject(params, async function (err, data) {
      if (err) res.json({ status: false }); // error
      else {
        const CollegeData = await users.findById(req.auth.id);
        let document = CollegeData.Documents;
        document[key] = false;
        const College = await users.findByIdAndUpdate(req.auth.id, { Documents: document });
        if (College) {
          res.json({ status: true });
        }
      } // deleted
    });
  } catch (error) {
    console.log("Error in delete doc", err);
    res.json({ status: false, error: error });
  }
});

UserRouter.get("/documents", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    var params = {
      Bucket: BUCKET,
      Delimiter: "/",
      Prefix: `${req.auth.ccode}/`,
    };
    let keys = [];
    let signedUrls = {};
    await s3.listObjectsV2(params, function (err, data) {
      if (err) {
        console.log("Error in /documents", err, err.stack);
        res.json({ status: false, error: err });
      } else {
        data.Contents.forEach((con) => keys.push(con["Key"]));
        for (let i = 0; i < keys.length; i++) {
          var params = {
            Bucket: BUCKET,
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
    console.log("Error in getting documents", err);
    res.json({ status: false, error: error });
  }
});

UserRouter.post("/declaration", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  const { flag } = req.body;
  const auth = await users.findById(req.auth.id);

  if (!auth) {
    return res.status(404).json({ message: "User not found" });
  }

  const College = await users.findByIdAndUpdate(req.auth.id, { DeclarationFlag: flag });

  if (College) {
    res.json({ status: true });
  }
});

UserRouter.post("/forgotpass", async (req, res) => {
  try {
    const { CollegeCode } = req.body;

    const College = await users.findOne({ ccode: CollegeCode });

    if (College.Email.length < 1) {
      return res.json({ status: false, message: "Email not found" });
    }

    if (!College) {
      return res.json({ status: false, message: "Invalid college code" });
    } else {
      const message = {
        from: "tneaseatmatrixteam@gmail.com",
        to: `${College.Email}`,
        // to: "lovlyraghav1@gmail.com",
        subject: "TNEA SeatMatrix Password",
        text: `We have received your request to view your password. Please find your old password below:\nPassword: ${College.CollegePassword}. \n\nPlease note that this password is confidential and should not be shared with anyone.\n\nFor any questions or concerns, please contact us.\nEmail:Tneaseatmatrixteam@gmail.com`,
      };

      transporter.sendMail(message, function (err, data) {
        if (err) {
          throw Error("Error while sending Email", err);
        } else {
          console.log("Email sent to College");
          res.json({ status: true, message: "Email sent to college" });
        }
      });
    }
  } catch (error) {
    console.log("Error in resetting passowrd", error);
    res.status(500).json({ status: false, error: error });
  }
});

// *Route for admin panel dashboard - jermey*

UserRouter.get("/list/college/:collegeCode", async (req, res) => {
  try {
    const collegeCode = req.params.collegeCode;
    const college = await users.find({ ccode: collegeCode });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/dash", async (req, res) => {
  try {
    const coll = await users.find({});
    const LoginCollege = await users.find({ CollegePassword: { $exists: true } });
    const PersonalD = await users.find({
      PersonalDetailFlag: { $eq: true },
    });
    const BankD = await users.find({
      BankDetailFlag: { $eq: true },
    });
    const CourseD = await users.find({
      CourseDetails: { $exists: true },
    });
    const p1f = await users.find({
      Phase1Freeze: { $eq: true },
    });
    const p2f = await users.find({
      Phase2Freeze: { $eq: true },
    });
    const declD = await users.find({
      DeclarationFlag: { $eq: true },
    });
    const docD = await users.find({
      DocumentUploadFlag: { $eq: true },
    });

    res.setHeader("Content-type", "text/html");
    res.send(
      "<html><body><p>Total number of colleges: <b>" +
        coll?.length +
        "</b><br/>Colleges that have logged in: <b>" +
        LoginCollege?.length +
        "</b> <br/> Colleges that have filled Personal Details: <b>" +
        PersonalD?.length +
        "</b> <br/> Colleges that have filled Bank Details: <b>" +
        BankD?.length +
        "</b><br/> Colleges that have filled Course Details: <b>" +
        CourseD?.length +
        "</b><br/> Colleges those who all Freezed Phase 1 are: <b>" +
        p1f?.length +
        "</b><br/> Colleges that have marked declaration: <b>" +
        declD?.length +
        "</b><br/> Colleges that have uploaded documents: <b>" +
        docD?.length +
        "</b><br/> Colleges that have Freezed Phase 2 are: <b>" +
        p2f?.length +
        "</b></p></body></html>"
    );
  } catch (error) {
    res.send(error);
  }
});
UserRouter.get("/list/seats", async (req, res) => {
  try {
    let array = {};
    let intake = 0;
    let govt = 0;
    let management = 0;
    let sws = 0;
    let freezeflag = 0;
    let unfreezeflag = 0;
    let personalDetail = 0;
    let courseDetails = 0;
    let declaration = 0;
    let documentUploadFlag = 0;
    const college = await users.find({});
    college.map((c) => {
      if (c.FreezeFlag) {
        freezeflag = freezeflag + 1;
      } else {
        unfreezeflag = unfreezeflag + 1;
      }
      if (c?.PersonalDetailFlag) {
        personalDetail = personalDetail + 1;
      }
      if (c?.CourseDetails.length > 1) {
        courseDetails = courseDetails + 1;
      }
      if (c?.DeclarationFlag) {
        declaration = declaration + 1;
      }
      if (c?.DocumentUploadFlag) {
        documentUploadFlag = documentUploadFlag + 1;
      }
      if (c.CourseDetails) {
        c.CourseDetails.map((course) => {
          intake = intake + course.intake;
          govt = govt + course.Govt;
          management = management + course.Management;
          sws = sws + course.SWS;
        });
      }
    });

    res.json({
      intake: intake,
      govt: govt,
      management: management,
      sws: sws,
      freezeflag: freezeflag,
      unfreezeflag: unfreezeflag,
      perd: personalDetail,
      cour: courseDetails,
      dec: declaration,
      doc: documentUploadFlag,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/list/freeze", async (req, res) => {
  try {
    const college = await users.find({ FreezeFlag: true });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.get("/list/notfreeze", async (req, res) => {
  try {
    // const college = await users.find({ FreezeFlag: null || false });
    const college = await users.find({ $or: [{ FreezeFlag: false }, { FreezeFlag: { $exists: false } }] });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

UserRouter.post("/unlock/:collegeCode", async (req, res) => {
  try {
    const collegeCode = req.params.collegeCode;
    const college = await users.findOneAndUpdate({ ccode: collegeCode }, { FreezeFlag: false });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});
UserRouter.post("/lock/:collegeCode", async (req, res) => {
  try {
    const collegeCode = req.params.collegeCode;
    const college = await users.findOneAndUpdate({ ccode: collegeCode }, { FreezeFlag: true });
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Setting CourseDetails
UserRouter.post("/setCourseDetails", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const { CourseDetails } = req.body;
    if (!CourseDetails) {
      res.json({ status: false, message: "incomplete body set" });
    } else {
      const user = await users.findByIdAndUpdate(req.auth.id, {
        CourseDetails: CourseDetails,
      });
      res.json({ status: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = UserRouter;
