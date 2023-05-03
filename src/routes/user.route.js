const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middleware/validateToken');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', validateToken, userController.getUsers);
userRouter.get('/:id', validateToken, userController.getUser);
userRouter.delete('/me', validateToken, userController.deleteUser);

module.exports = userRouter;