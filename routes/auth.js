const express = require('express');
const router = express.Router();
const User = require('../model/User');

// validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  phone: Joi.string()
    .min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  age: Joi.number()
    .integer()
    .min(18)
    .max(65)
    .required(),
  gender: Joi.string()
    .valid('female', 'male'),
  hobby: Joi.string()
    .min(3)
    .required(),
});

router.post('/register', async (req, res) => {
  // validate data
  const {error} = schema.validate(req.body);
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