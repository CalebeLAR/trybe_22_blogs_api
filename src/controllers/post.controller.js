const mapErros = require('./mapError');
const { postService } = require('../services');
const { blogPostValidate } = require('./validations/post.schema.validation');

const createBlogPost = async (req, res) => {
  const blogPost = req.body;
  const { payload } = req;

  const error = blogPostValidate(blogPost);
  if (error.type) return res.status(mapErros(error.type)).json({ message: error.message });

  const { type, message } = await postService.createBlogPost(blogPost, payload);
  if (type) return res.status(mapErros(type)).json({ message });

  res.status(200).json({ message });
};

module.exports = {
  createBlogPost,
};
