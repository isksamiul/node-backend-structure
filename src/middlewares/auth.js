const jwtLib = require('../libs/jwtLib');
const responseLib = require('../libs/responseLib');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      const apiResponse = responseLib.generate(true, "Authorization header missing", null);
      return res.status(401).send(apiResponse);
    }

    // Check if it's a Bearer token
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      const apiResponse = responseLib.generate(true, "Invalid authorization format. Use: Bearer <token>", null);
      return res.status(401).send(apiResponse);
    }

    const token = parts[1];

    // Verify token
    const result = jwtLib.verifyToken(token);
    
    if (!result.valid) {
      const apiResponse = responseLib.generate(true, "Invalid or expired token", null);
      return res.status(401).send(apiResponse);
    }

    // Attach user info to request
    req.user = result.decoded;
    next();

  } catch (error) {
    const apiResponse = responseLib.generate(true, "Authentication failed", null);
    return res.status(401).send(apiResponse);
  }
};

module.exports = {
  authMiddleware
};
