// routes/api/Auths.js

const express = require("express");
const AuthRouter = express.Router();
const jwt = require("jsonwebtoken");
const secret = "6$Sz249eF18@MKy1N";
var { expressjwt: ejwt } = require("express-jwt");

// Load Auth model
const Auth = require("../../db/models/Auth");
const College = require("../../db/models/CollegeData");

// @route GET api/Auths/:id
// @description Get single Auth by id
// @access Public
AuthRouter.get("getById/:id", (req, res) => {
  Auth.findById(req.params.id)
    .then((Auth) => res.json(Auth))
    .catch((err) => res.status(404).json({ noAuthfound: "No Auth found" }));
});

AuthRouter.post("/", (req, res) => {
  Auth.create(req.body)
    .then((Auth) => res.json({ msg: "Auth added successfully" }))
    .catch((err) => res.status(400).json(err));
});

// // @route GET api/Auths/:id
// // @description Update Auth
// // @access Public
// AuthRouter.put('/:id', (req, res) => {
//   Auth.findByIdAndUpdate(req.params.id, req.body)
//     .then(Auth => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// // @route GET api/Auths/:id
// // @description Delete Auth by id
// // @access Public
// AuthRouter.delete('/:id', (req, res) => {
//   Auth.findByIdAndRemove(req.params.id, req.body)
//     .then(Auth => res.json({ mgs: 'Auth entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a Auth' }));
// });

// Login auth and generate JWT
AuthRouter.post("/login", async (req, res) => {
  const { CollegeCode, CollegePassword } = req.body;
  try {
    // Find the auth with the given email
    const auth = await Auth.findOne({ CollegeCode });

    if (!auth) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password with the hashed password
    const match = CollegePassword == auth.CollegePassword;

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign({ id: auth.id, CollegeCode: auth.CollegeCode }, secret, { expiresIn: "1h" });
    const resetReq = auth.CollegeCode == auth.CollegePassword;
    res.json({ token: token, resetReq: resetReq });
  } catch (err) {
    res.status(500).json(err);
  }
});
AuthRouter.post("/resetPasswordInitial", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    console.log(req.auth);
    const auth = await Auth.findOneAndUpdate({ CollegeCode: req.auth.CollegeCode }, req.body);

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

AuthRouter.get("/collegeData", ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    const auth = await Auth.findOne({ CollegeCode: req.auth.CollegeCode });

    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(auth);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = AuthRouter;
