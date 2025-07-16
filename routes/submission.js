import express from 'express';
import { submitAnswers, getMySubmissions, submitExternalQuiz } from '../controllers/submissionController.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

router.post('/submit', verifyToken, submitAnswers);
router.get('/me', verifyToken, getMySubmissions);
router.post('/submit-external', verifyToken, submitExternalQuiz);

export default router; 