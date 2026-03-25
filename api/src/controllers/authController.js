const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');

/**
 * POST /api/auth/token
 *
 * Accepts a Firebase ID token from the client, verifies it with Firebase Admin,
 * then issues a lightweight server-side JWT that only stores { uid }.
 *
 * Flow:
 *   Client (Firebase Auth) --> sends firebaseToken
 *   Server verifies it     --> extracts uid
 *   Server issues JWT      --> returns { idToken }
 */
const exchangeToken = async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) {
    return res.status(400).json({ error: 'firebaseToken is required' });
  }

  try {
    // 1. Verify the Firebase token is valid & not expired
    const decodedFirebase = await admin.auth().verifyIdToken(firebaseToken);

    const uid = decodedFirebase.uid;

    // 2. Issue a server-side JWT containing only the uid
    const idToken = jwt.sign(
      { uid },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    );

    return res.json({ idToken });
  } catch (err) {
    console.error('Token exchange error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired Firebase token' });
  }
};

module.exports = { exchangeToken };
