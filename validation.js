// validation
const Joi = require('@hapi/joi');

// register validation
const registerValidation = (data) => {
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
  // validate data
  return schema.validate(data);
};

// login validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });
  // validate data
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;