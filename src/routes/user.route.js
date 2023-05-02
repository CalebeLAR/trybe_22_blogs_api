const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middleware/validateToken');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', validateToken, userController.getUsers);
userRouter.get('/:id', validateToken, userController.getUser);

module.exports = userRouter;