const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getComment, getCommentsByPost, createComment } = require('../controllers/commentController');

const router = Router();

// GET /api/comments/:commentId — returns a single comment (text + date) by comment_id
router.get('/:commentId', verifyIdToken, getComment);

// GET /api/comments/:postId/all — returns all comments on a community post
router.get('/:postId/all', verifyIdToken, getCommentsByPost);

// POST /api/comments/:postId — add a comment to a community post { text }
router.post('/:postId', verifyIdToken, createComment);

module.exports = router;

