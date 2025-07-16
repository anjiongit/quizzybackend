import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/question.js';
import authRoutes from './routes/auth.js';
import submissionRoutes from './routes/submission.js';
import leaderboardRoutes from './routes/leaderboard.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
// const authRoutes = require('./routes/auth'); // This line is removed
// const questionRoutes = require('./routes/question'); // This line is removed
// const submissionRoutes = require('./routes/submission'); // This line is removed
// const leaderboardRoutes = require('./routes/leaderboard'); // This line is removed

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Quizzy backend is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
