const { Comment } = require('../models');

/**
 * GET /api/comments/:postId
 * Returns the comment with the given comment_id showing text and date.
 */
const getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { comment_id: req.params.postId },
      attributes: ['comment_id', 'text', 'date'],
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getComment };
