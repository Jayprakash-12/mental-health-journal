import express from 'express';
import {
    getJournals,
    getJournal,
    createJournal,
    updateJournal,
    deleteJournal,
} from '../controllers/journalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getJournals).post(protect, createJournal);
router.route('/:id').get(protect, getJournal).put(protect, updateJournal).delete(protect, deleteJournal);

export default router;
