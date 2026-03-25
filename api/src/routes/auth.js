const { Router } = require('express');
const { exchangeToken } = require('../controllers/authController');
const { verifyIdToken } = require('../middleware/authMiddleware');

const router = Router();

/**
 * POST /api/auth/token
 * Public — exchange a Firebase ID token for a server-issued JWT
 * Body: { firebaseToken: string }
 */
router.post('/token', exchangeToken);

/**
 * GET /api/auth
 * Protected — requires a valid server-issued JWT in the Authorization header
 * Returns the authenticated user's uid
 */
router.get('/', verifyIdToken, (req, res) => {
  res.json({
    message: 'Authenticated successfully',
    uid: req.user.uid,
  });
});

module.exports = router;
