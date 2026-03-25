const { Donation, User } = require('../models');

/**
 * GET /api/donations
 * - If ?userid= query param is given: returns donations for that user ID
 * - Otherwise: returns donations for current authenticated user
 */
const getDonations = async (req, res) => {
  try {
    let where = {};
    if (req.query.userid) {
      where = { user_id: req.query.userid };
    } else {
      // Resolve current user from JWT uid
      const user = await User.findOne({ where: { uid: req.user.uid } });
      if (!user) return res.status(404).json({ error: 'User not found' });
      where = { user_id: user.user_id };
    }
    const donations = await Donation.findAll({ where });
    return res.json(donations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /api/donations
 * Body: { place, points }
 * Time is automatically set to now.
 */
const createDonation = async (req, res) => {
  const { place, points } = req.body;
  if (!place || points === undefined) {
    return res.status(400).json({ error: 'place and points are required' });
  }
  try {
    const user = await User.findOne({ where: { uid: req.user.uid } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const donation = await Donation.create({
      user_id: user.user_id,
      place,
      time: new Date(),
      points,
    });

    return res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getDonations, createDonation };
