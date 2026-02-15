import express from 'express';
import { logMood, getMoodHistory, getMoodStats } from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// POST /api/mood - Log a new mood
router.post('/', logMood);

// GET /api/mood/history - Get last 7 days of moods
router.get('/history', getMoodHistory);

// GET /api/mood/stats - Get mood statistics
router.get('/stats', getMoodStats);

export default router;
