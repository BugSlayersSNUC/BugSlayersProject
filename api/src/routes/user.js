const { Router } = require('express');
const { verifyIdToken } = require('../middleware/authMiddleware');
const { getCurrentUser, getUserById, updateCurrentUser } = require('../controllers/userController');

const router = Router();

// GET /api/users — current user + their donations
router.get('/', verifyIdToken, getCurrentUser);

// PATCH /api/users — update first_name, last_name, group_id
router.patch('/', verifyIdToken, updateCurrentUser);

// GET /api/users/:id — specific user + their donations
router.get('/:id', verifyIdToken, getUserById);

module.exports = router;