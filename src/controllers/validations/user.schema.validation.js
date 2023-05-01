const { userShema } = require('./user.schema');

const validateUser = (user) => {
  const { error } = userShema.validate(user);
  if (error && error.message.includes('required')) {
    return { type: 'MISSING_VALUE', message: error.message };
  }

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: user };
};

module.exports = {
  validateUser,
};
