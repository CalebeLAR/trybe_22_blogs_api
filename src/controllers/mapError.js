const errorMap = {
  INVALID_VALUE: 400,
  MISSING_VALUE: 400,
  USER_NOT_FOUND: 400,
  USER_ALREADY_REGISTERED: 409,
  CATEGORY_ALREADY_REGISTERED: 409,
  UNAUTHORIZED: 401,
  NONEXISTENT_USER: 404,
  CATEGORY_NOT_FOUND: 400,
  NONEXISTENT_BLOGPOST: 404,
  NO_CONTENT: 204,
};

const mapErros = (type) => {
  const status = errorMap[type] || 500;
  
  return status;
};

module.exports = mapErros;