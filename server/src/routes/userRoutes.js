import express from 'express';
import { getUserStats, getUserProfile, updateUserProfile, changePassword, deleteAccount } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/stats', getUserStats);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', changePassword);
router.delete('/account', deleteAccount);

export default router;
