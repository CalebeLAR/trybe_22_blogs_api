const jwt = require('jsonwebtoken');
const { validateUser } = require('./validations/user.schema.validation');
const { userService } = require('../services');
const mapError = require('./mapError');

const secret = process.env.JWT_SECRET || 'secretJWT';

const invalidTokenErros = (err) => {
  const { message, name } = err;
  console.log(name);
  if (message === 'jwt must be provided') {
    return { type: 'UNAUTHORIZED', message: 'Token not found' };
  }
  // message === 'jwt expired' || message === 'invalid token'
  if (name === 'JsonWebTokenError') {
    return { type: 'UNAUTHORIZED', message: 'Expired or invalid token' };
  }

  return { type: null };
};

const createUser = async (req, res) => {
  try {
    const error = validateUser(req.body);
    if (error.type) return res.status(mapError(error.type)).json({ message: error.message });
    
    const { type, message } = await userService.createUser(req.body);
    if (type) return res.status(mapError(type)).json({ message });
    
    res.status(201).json({ token: message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { authorization: token } = req.headers;

    jwt.verify(token, secret);

    const { type, message } = await userService.getUsers();
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(200).json(message);
  } catch (err) {
    const { type, message } = invalidTokenErros(err);
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
};