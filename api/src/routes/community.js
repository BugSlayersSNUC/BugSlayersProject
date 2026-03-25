const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getCommunities, createCommunity, upvotePost } = require('../controllers/communityController');

const router = Router();

// GET /api/community — all communities with their comments
router.get('/', verifyIdToken, getCommunities);

// POST /api/community — { title, description }
router.post('/', verifyIdToken, createCommunity);

// POST /api/community/:id/upvote — increment upvotes for a post
router.post('/:id/upvote', verifyIdToken, upvotePost);

module.exports = router;

