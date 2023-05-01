const { validateUser } = require('./validations/user.schema.validation');
const { userService } = require('../services');
const mapError = require('./mapError');

const createUser = async (req, res) => { 
  const error = validateUser(req.body);
  if (error.type) return res.status(mapError(error.type)).json({ message: error.message });

  const { type, message } = await userService.createUser(req.body);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json({ token: message });
};

module.exports = {
  createUser,
};