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
app.use('/api/user', userRoutes);

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
