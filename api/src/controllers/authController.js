const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const { User } = require('../models');

/**
 * POST /api/auth/token
 *
 * Accepts a Firebase ID token from the client, verifies it with Firebase Admin,
 * then issues a lightweight server-side JWT that only stores { uid }.
 *
 * Also performs a findOrCreate on the Users table — if the user is new they are
 * inserted; if they already exist their full profile is returned.
 *
 * Flow:
 *   Client (Firebase Auth) --> sends firebaseToken
 *   Server verifies it     --> extracts uid + email
 *   Server findOrCreate    --> ensures user row exists in DB
 *   Server issues JWT      --> returns { idToken, user, isNew }
 */
const exchangeToken = async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) {
    return res.status(400).json({ error: 'firebaseToken is required' });
  }

  try {
    // 1. Verify the Firebase token is valid & not expired
    const decodedFirebase = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email } = decodedFirebase;

    // 2. Find or create the user in the database
    const [user, isNew] = await User.findOrCreate({
      where: { uid },
      defaults: {
        uid,
        email: email || null,
      },
    });

    // 3. Issue a server-side JWT containing only the uid
    const idToken = jwt.sign(
      { uid },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    );

    return res.json({ idToken, user, isNew });
  } catch (err) {
    console.error('Token exchange error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired Firebase token' });
  }
};

module.exports = { exchangeToken };
