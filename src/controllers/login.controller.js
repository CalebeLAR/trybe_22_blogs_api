const { loginValidate } = require('./validations/login.schema.validation');
const { loginService } = require('../services');
const mapError = require('./mapError');

const login = async (req, res) => {
  try {
    const error = loginValidate(req.body);
    if (error.type) return res.status(mapError(error.type)).json({ message: error.message });
  
    const { email, password } = req.body;
    const { type, message } = await loginService.login(email, password);
    
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(200).json({ token: message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  };

module.exports = {
  login,
};