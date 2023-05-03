const express = require('express');
const validateToken = require('../middleware/validateToken');
const postController = require('../controllers/post.controller');

const postRoute = express.Router();

postRoute.post('/', validateToken, postController.createBlogPost);
postRoute.get('/', validateToken, postController.getAllBlogPost);
postRoute.get('/:id', validateToken, postController.findBlogPost);

module.exports = postRoute;