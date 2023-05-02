const { BlogPost } = require('../models');

const createBlogPost = async (blogPost, payload) => {
  const { title, content } = blogPost;
  const { id: userId } = payload;

  const newBlogPost = { title, content, userId };
  const result = await BlogPost.create(newBlogPost);

  return { type: null, message: result };
};

module.exports = {
  createBlogPost,
};