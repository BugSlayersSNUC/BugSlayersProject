const { Community, Comment, User, sequelize } = require('../models');

// Create a CommunityWithComments view for performance
const initCommunityView = async () => {
  await sequelize.query(`
    CREATE VIEW IF NOT EXISTS CommunityWithComments AS
    SELECT
      c.community_id,
      c.title,
      c.description,
      c.user_id,
      c.upvotes,
      c.date,
      cm.comment_id,
      cm.user_id  AS comment_user_id,
      cm.text     AS comment_text,
      cm.date     AS comment_date
    FROM Communities c
    LEFT JOIN Comments cm ON cm.community_id = c.community_id
  `);
};

initCommunityView().catch(console.error);

/**
 * GET /api/community
 * Lists all communities with their comments (via eager load).
 */
const getCommunities = async (_req, res) => {
  try {
    const communities = await Community.findAll({
      include: [{ model: Comment }],
      order: [['date', 'DESC']],
    });
    return res.json(communities);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /api/community
 * Body: { title, description }
 */
const createCommunity = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  try {
    const user = await User.findOne({ where: { uid: req.user.uid } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const community = await Community.create({
      title,
      description,
      user_id: user.user_id,
      upvotes: 0,
      date: new Date(),
    });
    return res.status(201).json(community);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCommunities, createCommunity };
