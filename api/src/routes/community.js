const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getCommunities, createCommunity } = require('../controllers/communityController');

const router = Router();

// GET /api/community — all communities with their comments
router.get('/', verifyIdToken, getCommunities);

// POST /api/community — { title, description }
router.post('/', verifyIdToken, createCommunity);

module.exports = router;
