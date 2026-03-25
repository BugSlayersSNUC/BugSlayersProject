const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getComment } = require('../controllers/commentController');

const router = Router();

// GET /api/comments/:postId — returns text and date of a specific comment
router.get('/:postId', verifyIdToken, getComment);

module.exports = router;
