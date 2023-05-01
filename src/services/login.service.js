const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'secretJWT';
const algorithm = { algorithm: 'HS256', expiresIn: '7d' };

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };

    const { password: _, ...userWithOutPassword } = user.dataValues;

    const token = jwt.sign({ payload: userWithOutPassword }, secret, algorithm);
    return { type: null, message: token };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

module.exports = {
  login,
};
