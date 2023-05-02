const errorMap = {
  INVALID_VALUE: 400,
  MISSING_VALUE: 400,
  USER_NOT_FOUND: 400,
  USER_ALREADY_REGISTERED: 409,
  UNAUTHORIZED: 401,
};

const mapErros = (type) => {
  const status = errorMap[type] || 500;
  
  return status;
};

module.exports = mapErros;