const { User } = require('../models');
const { generateToken } = require('../auth/authorizations');

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };

    const { password: _, ...userWithOutPassword } = user.dataValues;
    const token = generateToken(userWithOutPassword);

    return { type: null, message: token };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

module.exports = {
  login,
};
