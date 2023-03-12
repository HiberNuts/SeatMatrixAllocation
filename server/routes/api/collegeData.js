const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "6$Sz249eF18@MKy1N";
var { expressjwt: ejwt } = require("express-jwt");

// Load Auth model
const Auth = require("../../db/models/Auth");
const College = require("../../db/models/CollegeData");

router.get("/college", async (req, res) => {
  const data = await College.find({});
  console.log(data);
  res.send(data);
});

router.get("/collegeData", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    const auth = await Auth.find({ id: req.auth.CollegeCode });

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    const college = await College.find({ ccode: req.auth.ccode });

    if (!college) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
