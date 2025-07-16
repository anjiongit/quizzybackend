import Submission from '../models/Submission.js';
import Question from '../models/Question.js';

// +5 for correct, -1 for wrong
const SCORE_CORRECT = 1;
const SCORE_WRONG = 0;

export const submitAnswers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body; // { questionId: selectedOptionIndex, ... }
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Invalid answers format' });
    }
    let score = 0;
    const questionIds = Object.keys(answers);
    const questions = await Question.find({ _id: { $in: questionIds } });
    questions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer === q.correctAnswer) score += SCORE_CORRECT;
      else score += SCORE_WRONG;
    });
    const submission = new Submission({ user: userId, answers, score });
    await submission.save();
    res.status(201).json({ score, submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMySubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await Submission.find({ user: userId }).sort({ submittedAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitExternalQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questions, score, source } = req.body;
    if (!Array.isArray(questions) || typeof score !== 'number') {
      return res.status(400).json({ message: 'Invalid external quiz submission format' });
    }
    const submission = new Submission({
      user: userId,
      external: true,
      questions,
      score,
      source: source || 'external',
    });
    await submission.save();
    res.status(201).json({ score, submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 