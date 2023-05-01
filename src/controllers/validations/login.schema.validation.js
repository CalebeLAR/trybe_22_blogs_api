const { loginSchema } = require('./login.schema');

const loginValidate = (login) => {
  const { error } = loginSchema.validate(login);

  if (error && error.message === 'Invalid fields') {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  if (error && error.message === 'Some required fields are missing') {
    return { type: 'MISSING_VALUE', message: error.message };
  }

  return { type: null, message: login };
};

module.exports = {
  loginValidate,
};