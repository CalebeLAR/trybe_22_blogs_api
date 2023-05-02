const { User } = require('../models');
const { generateToken } = require('../auth/authorizations');

const createUser = async (user) => {
  try {
    const isAlreadyRegistered = await User.findOne({ where: { email: user.email } });
    if (isAlreadyRegistered) {
      return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
    }

    const userCreated = await User.create(user);

    const { password: _, ...userWithOutPassword } = userCreated.dataValues;
    const token = generateToken(userWithOutPassword);

    return { type: null, message: token };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll(
      { attributes: ['id', 'displayName', 'email', 'image'] },
    );

    if (!users) return { type: null, message: 'table users is empty' };

    return { type: null, message: users };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

module.exports = {
  createUser,
  getUsers,
};
