const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const getAccessToken = req.get('X-Access-Token');
  if (!getAccessToken) {
    throw new ClientError(400, 'authentication required');
  }
  const payload = jwt.verify(getAccessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
