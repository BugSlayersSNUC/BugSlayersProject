const { Comment, User } = require('../models');

/**
 * GET /api/comments/:commentId
 * Returns the text and date for a specific comment by its comment_id.
 */
const getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { comment_id: req.params.commentId },
      attributes: ['comment_id', 'text', 'date'],
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * GET /api/comments/:postId/all
 * Returns all comments for a given community post.
 */
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { community_id: req.params.postId },
      attributes: ['comment_id', 'user_id', 'text', 'date'],
      order: [['date', 'ASC']],
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /api/comments/:postId
 * Creates a comment on a specific community post.
 * Body: { text }
 */
const createComment = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });

  try {
    const user = await User.findOne({ where: { uid: req.user.uid } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const comment = await Comment.create({
      community_id: req.params.postId,
      user_id: user.user_id,
      text,
      date: new Date(),
    });
    return res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getComment, getCommentsByPost, createComment };

