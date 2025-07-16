import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.get('/', verifyToken, getLeaderboard);

export default router; 