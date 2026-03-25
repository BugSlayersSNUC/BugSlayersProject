const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getGroups, getGroupById, createGroup } = require('../controllers/groupController');

const router = Router();

// GET /api/groups — all groups with member count + total points
// GET /api/groups?sort=leaderboard — same data, secondary sort by member_count DESC
router.get('/', verifyIdToken, getGroups);

// GET /api/groups/:id — single group with its member list
router.get('/:id', verifyIdToken, getGroupById);

// POST /api/groups — create a group
router.post('/', verifyIdToken, createGroup);

module.exports = router;

