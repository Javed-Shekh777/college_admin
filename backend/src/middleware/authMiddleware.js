const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const { Tokens } = require('../constans');

module.exports = (req, res, next) => {
  const rawHeader = req.headers.authorization;
  const token = rawHeader?.startsWith('Bearer ')
    ? rawHeader.split(' ')[1]
    : rawHeader;
console.log(token);
  if (!token) return errorResponse(res, 'Access denied. No token provided.', 401);

  try {
    const decoded = jwt.verify(token, Tokens.acessToken);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, 'Invalid or expired token.', 401);
  }
};
