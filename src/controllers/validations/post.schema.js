const joi = require('joi');

const postSchema = joi.object({
  title: joi.string().min(1).required(),
  content: joi.string().min(1).required(),
  categoryIds: joi.array().items(joi.number().integer()).min(1).required(),
});

module.exports = {
  postSchema,
};