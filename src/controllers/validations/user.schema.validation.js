const { userShema, idUserShema } = require('./user.schema');

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

const validateUserId = (userId) => {
  const { error } = idUserShema.validate(userId);
  if (error && error.message.includes('required')) {
    return { type: 'MISSING_VALUE', message: error.message };
  }

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: userId };
};

module.exports = {
  validateUser,
  validateUserId,
};
