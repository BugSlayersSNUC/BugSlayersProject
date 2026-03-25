const { User, Donation } = require('../models');

/**
 * GET /api/users
 * Returns the current authenticated user + all their donations.
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uid: req.user.uid },
      include: [{ model: Donation }],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * GET /api/users/:id
 * Returns the user with the given user_id + all their donations.
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
      include: [{ model: Donation }],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * PATCH /api/users
 * Update first_name, last_name, and/or group_id of the current user.
 * Body: { first_name?, last_name?, group_id? }
 */
const updateCurrentUser = async (req, res) => {
  const { first_name, last_name, group_id } = req.body;
  const allowed = {};
  if (first_name !== undefined) allowed.first_name = first_name;
  if (last_name !== undefined) allowed.last_name = last_name;
  if (group_id !== undefined) allowed.group_id = group_id;

  try {
    const [updated] = await User.update(allowed, { where: { uid: req.user.uid } });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    const user = await User.findOne({ where: { uid: req.user.uid } });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCurrentUser, getUserById, updateCurrentUser };
