const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');


router.post('/register', async (req, res) => {
  // validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    hobby: req.body.hobby
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;