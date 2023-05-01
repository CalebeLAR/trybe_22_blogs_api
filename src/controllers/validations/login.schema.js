const joi = require('joi');

// request post login schema 
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.email': 'Invalid fields',
  'string.empty': 'Some required fields are missing',
});

module.exports = {
  loginSchema,
};