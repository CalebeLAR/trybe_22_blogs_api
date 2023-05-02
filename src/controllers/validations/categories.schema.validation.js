const { categorySchema } = require('./categories.schema');

const validateCategory = (category) => {
  const { error } = categorySchema.validate(category);

  if (error && error.message.includes('is required')) {
    return { type: 'MISSING_VALUE', message: error.message };
  }

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: category };
};

module.exports = {
  validateCategory,
};