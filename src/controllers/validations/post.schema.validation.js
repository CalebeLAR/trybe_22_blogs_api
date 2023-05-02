const { postSchema } = require('./post.schema');

const blogPostValidate = (blogPost) => {
  const { error } = postSchema.validate(blogPost);
  if (error && error.message.includes('is not allowed to be empty')) {
    return { type: 'MISSING_VALUE', message: 'Some required fields are missing' };
  }

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: blogPost };
};

module.exports = {
  blogPostValidate,
};