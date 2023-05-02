const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secretJWT';
const algorithm = { algorithm: 'HS256', expiresIn: '1d' };

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, secret, algorithm);

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

const invalidTokenErros = (err) => {
  const { message, name } = err;
  if (message === 'jwt must be provided') {
    return { type: 'UNAUTHORIZED', message: 'Token not found' };
  }
  // message === 'jwt expired' || message === 'invalid token'
  if (name === 'JsonWebTokenError') {
    return { type: 'UNAUTHORIZED', message: 'Expired or invalid token' };
  }

  return { type: null };
};

module.exports = {
  generateToken,
  verifyToken,
  invalidTokenErros,
};
