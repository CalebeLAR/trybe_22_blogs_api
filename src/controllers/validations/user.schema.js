const joi = require('joi');

// request post user schema 
const userShema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(), // 409
  password: joi.string().min(6).required(),
  image: joi.string().required(),
});

const idUserShema = joi.number().min(1).integer().required();

module.exports = {
  userShema,
  idUserShema,
};
