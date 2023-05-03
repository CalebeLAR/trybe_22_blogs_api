const mapErros = require('./mapError');
const { postService } = require('../services');
const { blogPostValidate, 
  postWithOutCategoryValidate } = require('./validations/post.schema.validation');

const createBlogPost = async (req, res) => {
  const blogPost = req.body;
  const { payload } = req;

  const error = blogPostValidate(blogPost);
  if (error.type) return res.status(mapErros(error.type)).json({ message: error.message });

  const { type, message } = await postService.createBlogPost(blogPost, payload);
  if (type) return res.status(mapErros(type)).json({ message });

  res.status(201).json(message);
};

const getAllBlogPost = async (req, res) => {
  try {
    const { type, message } = await postService.getAllBlogPost();
    if (type) return res.status(mapErros(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    return { type: false, message: err.messege };
  }
};

const findBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await postService.findBlogPost(id);
    if (type) return res.status(mapErros(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    return { type: false, message: err.messege };
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const newBlogPost = req.body;
    const error = postWithOutCategoryValidate(newBlogPost);
    if (error.type) return res.status(mapErros(error.type)).json({ message: error.message });

    const postId = req.params.id;
    const userId = req.payload.id;

    const { type, message } = await postService.updateBlogPost(newBlogPost, postId, userId);
    if (type) return res.status(mapErros(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    return { type: false, message: err.messege };
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPost,
  findBlogPost,
  updateBlogPost,
};
