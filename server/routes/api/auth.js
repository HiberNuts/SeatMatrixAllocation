// routes/api/Auths.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = '6$Sz249eF18@MKy1N';
var { expressjwt: ejwt } = require("express-jwt");

// Load Auth model
const Auth = require('../../db/models/Auth');
const College = require('../../db/models/CollegeData');


// // @route GET api/Auths
// // @description Get all Auths
// // @access Public
// router.get('/', (req, res) => {
//   Auth.find()
//     .then(Auths => res.json(Auths))
//     .catch(err => res.status(404).json({ noAuthsfound: 'No Auths found' }));
// });

// @route GET api/Auths/:id
// @description Get single Auth by id
// @access Public
router.get('getById/:id', (req, res) => {
  Auth.findById(req.params.id)
    .then(Auth => res.json(Auth))
    .catch(err => res.status(404).json({ noAuthfound: 'No Auth found' }));
});

router.post('/', (req, res) => {

  College.create(req.body)
    .then(Auth => res.json({ msg: 'Auth added successfully' }))
    .catch(err => res.status(400).json(err));
});

// // @route GET api/Auths/:id
// // @description Update Auth
// // @access Public
// router.put('/:id', (req, res) => {
//   Auth.findByIdAndUpdate(req.params.id, req.body)
//     .then(Auth => res.json({ msg: 'Updated successfully' }))
//     .catch(err =>
//       res.status(400).json({ error: 'Unable to update the Database' })
//     );
// });

// // @route GET api/Auths/:id
// // @description Delete Auth by id
// // @access Public
// router.delete('/:id', (req, res) => {
//   Auth.findByIdAndRemove(req.params.id, req.body)
//     .then(Auth => res.json({ mgs: 'Auth entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'No such a Auth' }));
// });

// Login auth and generate JWT
router.post('/login', async (req, res) => {
  const { CollegeCode, CollegePassword } = req.body;
  try {
    // Find the auth with the given email
    const auth = await Auth.findOne({ CollegeCode });

    if (!auth) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const match = CollegePassword == auth.CollegePassword;

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ CollegeCode: auth.id }, secret, { expiresIn: '1h' });
    const resetReq = auth.CollegeCode == auth.CollegePassword;
    res.json({ token: token, resetReq: resetReq });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/resetPasswordInitial', ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    const auth = await Auth.findByIdAndUpdate(req.auth.CollegeCode, req.body);

    if (!auth) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ status: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/collegeData', ejwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  try {
    // Find the auth with the given ID
    const auth = await Auth.findById(req.auth.CollegeCode);

    if (!auth) {
      return res.status(404).json({ message: 'User not found' });
    }
    const college = await College.findOne({ code: auth.CollegeData_id });

    if (!college) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;