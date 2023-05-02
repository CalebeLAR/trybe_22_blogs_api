const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const validateToken = require('../middleware/validateToken');

const categoriesRoute = express.Router();

categoriesRoute.post('/', validateToken, categoriesController.createCategory);
categoriesRoute.get('/', validateToken, categoriesController.getCategories);

module.exports = categoriesRoute;