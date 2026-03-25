const jwt = require('jsonwebtoken');

/**
 * Middleware: verifyIdToken
 *
 * Expects an Authorization header:  Bearer <idToken>
 * where idToken is the server-issued JWT (NOT the Firebase token).
 *
 * On success, attaches { uid } to req.user and calls next().
 */
const verifyIdToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { uid: decoded.uid };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyIdToken };
