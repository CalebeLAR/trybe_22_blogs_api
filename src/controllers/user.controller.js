const { validateUser, validateUserId } = require('./validations/user.schema.validation');
const { userService } = require('../services');
const mapError = require('./mapError');

const createUser = async (req, res) => {
  try {
    const error = validateUser(req.body);
    if (error.type) return res.status(mapError(error.type)).json({ message: error.message });
    
    const { type, message } = await userService.createUser(req.body);
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(201).json({ token: message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { type, message } = await userService.getUsers();
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const error = validateUserId(id);
    if (error.type) return res.status(mapError(error.type)).json({ message: error.message });

    const { type, message } = await userService.getUser(id);
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};