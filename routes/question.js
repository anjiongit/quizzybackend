import express from 'express';
import { addQuestion, getQuestions } from '../controllers/questionController.js';
import { verifyToken, isAdmin } from '../utils/auth.js';

const router = express.Router();

router.post('/add', verifyToken, isAdmin, addQuestion);
router.get('/', getQuestions);

export default router; 