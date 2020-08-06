const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// register route
router.post('/register', async (req, res) => {
  // validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist');

  // hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashPassword,
    age: req.body.age,
    gender: req.body.gender,
    hobby: req.body.hobby
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch(err) {
    res.status(400).send(err);
  }
});

// login route
router.post('/login', async (req, res) => {
  // validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or passsword is wrong');
});

module.exports = router;