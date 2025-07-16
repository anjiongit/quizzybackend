import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Map, of: Number }, // questionId -> selectedOption index (for internal quizzes)
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  // For external quizzes:
  external: { type: Boolean, default: false },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String, // for external quizzes, store as string
    userAnswer: String,
  }],
  source: { type: String }, // e.g., 'quizapi.io'
});

export default mongoose.model('Submission', submissionSchema); 