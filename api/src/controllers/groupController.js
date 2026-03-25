const { Group, User, sequelize } = require('../models');

// Create the GroupTotal view once on startup for performance
const initGroupTotalView = async () => {
  await sequelize.query(`
    CREATE VIEW IF NOT EXISTS GroupTotal AS
    SELECT
      g.group_id,
      g.group_name,
      COUNT(u.user_id) AS member_count,
      COALESCE(SUM(u.points), 0) AS total_points
    FROM Groups g
    LEFT JOIN Users u ON u.group_id = g.group_id
    GROUP BY g.group_id, g.group_name
  `);
};

initGroupTotalView().catch(console.error);

/**
 * GET /api/groups
 * Returns all groups with total members and points from the GroupTotal view.
 */
const getGroups = async (_req, res) => {
  try {
    const [groups] = await sequelize.query('SELECT * FROM GroupTotal');
    return res.json(groups);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /api/groups
 * Create a new group.
 * Body: { group_name }
 */
const createGroup = async (req, res) => {
  const { group_name } = req.body;
  if (!group_name) return res.status(400).json({ error: 'group_name is required' });
  try {
    const group = await Group.create({ group_name });
    return res.status(201).json(group);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getGroups, createGroup };
