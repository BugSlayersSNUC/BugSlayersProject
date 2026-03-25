const { Router } = require('express');
const { exchangeToken } = require('../controllers/authController');
const { verifyIdToken } = require('../middleware/authMiddleware');

const router = Router();
router.get('/', verifyIdToken, function (req, res) {
    return res.json({ message: "hi" });
});

module.exports = router;