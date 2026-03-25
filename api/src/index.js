require('dotenv').config();
require('./config/firebase'); // initialise Firebase Admin early

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: true,                              // reflect request origin (or set a specific URL in prod)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', require('./routes/groups'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/community', require('./routes/community'));
app.use('/api/comments', require('./routes/comments'));

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ── Start ───────────────────────────────────────────────────
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ SQLite Database mapped and synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
