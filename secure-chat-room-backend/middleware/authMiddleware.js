const jwt = require('jsonwebtoken');
const { activeTokens } = require('../controllers/authController'); 
console.log(activeTokens)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(activeTokens)
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = activeTokens[0];
  // if (!token || !activeTokens) {
  //   return res.status(401).json({ message: 'Invalid or expired token' });
  // }
  if (!token || !activeTokens.length) {
    return res.status(401).json({ message: 'Invalid or expired token' });
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
