const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getDonations, createDonation } = require('../controllers/donationController');

const router = Router();

// GET /api/donations              — current user's donations
// GET /api/donations?userid=<id>  — specific user's donations
router.get('/', verifyIdToken, getDonations);

// POST /api/donations — { place, points }
router.post('/', verifyIdToken, createDonation);

module.exports = router;
