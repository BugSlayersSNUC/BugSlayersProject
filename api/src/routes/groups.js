const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getGroups, createGroup } = require('../controllers/groupController');

const router = Router();

// GET /api/groups — all groups with member count + total points (GroupTotal view)
router.get('/', verifyIdToken, getGroups);

// POST /api/groups — create a group
router.post('/', verifyIdToken, createGroup);

module.exports = router;
