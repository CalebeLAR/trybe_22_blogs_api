const { verifyToken, invalidTokenErros } = require('../auth/authorizations');
const mapError = require('../controllers/mapError');

const validateToken = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    const { payload } = verifyToken(token);

    req.payload = payload;

    next();
  } catch (err) {
    const { type, message } = invalidTokenErros(err);
    if (type) return res.status(mapError(type)).json({ message });
    
    return res.status(500).json({ message: err.message });
  }
};

module.exports = validateToken;