const { Group, User, sequelize } = require('../models');

/**
 * GET /api/groups
 * Returns all groups with total members and points from the GroupTotal view.
 * Optional query param: ?sort=leaderboard — adds a secondary sort by member_count DESC.
 */
const getGroups = async (req, res) => {
  try {
    const isLeaderboard = req.query.sort === 'leaderboard';
    const orderClause = isLeaderboard
      ? 'ORDER BY total_points DESC, member_count DESC'
      : 'ORDER BY total_points DESC';
    const [groups] = await sequelize.query(`SELECT * FROM GroupTotal ${orderClause}`);
    return res.json(groups);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * GET /api/groups/:id
 * Returns a single group with its member list (user_id, email, first_name, last_name, points).
 */
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findOne({
      where: { group_id: req.params.id },
    });
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const [members] = await sequelize.query(`
      SELECT
        u.user_id,
        u.email,
        u.first_name,
        u.last_name,
        COALESCE(up.total_points, 0) AS points
      FROM Users u
      LEFT JOIN UserPoints up ON up.user_id = u.user_id
      WHERE u.group_id = ?
      ORDER BY points DESC, u.user_id ASC
    `, {
      replacements: [req.params.id],
    });

    return res.json({
      ...group.toJSON(),
      Users: members,
    });
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

module.exports = { getGroups, getGroupById, createGroup };
