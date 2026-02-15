import mongoose from 'mongoose';
import User from '../models/User.js';
import Journal from '../models/Journal.js';
import Mood from '../models/Mood.js';

// @desc    Get user profile stats
// @route   GET /api/user/stats
// @access  Private
export const getUserStats = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Get all journal entries sorted by date
        const journals = await Journal.find({ user: userId })
            .select('createdAt')
            .sort({ createdAt: -1 });

        // Calculate journal streak (consecutive days)
        let streak = 0;
        if (journals.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const journalDates = journals.map(j => {
                const date = new Date(j.createdAt);
                date.setHours(0, 0, 0, 0);
                return date.getTime();
            });

            // Remove duplicates and sort
            const uniqueDates = [...new Set(journalDates)].sort((a, b) => b - a);

            // Check if today or yesterday has entry (streak is still active)
            const lastEntryDate = new Date(uniqueDates[0]);
            const daysSinceLastEntry = Math.floor((today - lastEntryDate) / (1000 * 60 * 60 * 24));

            if (daysSinceLastEntry <= 1) {
                streak = 1;
                let currentDate = new Date(uniqueDates[0]);

                for (let i = 1; i < uniqueDates.length; i++) {
                    const prevDate = new Date(uniqueDates[i]);
                    const dayDiff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

                    if (dayDiff === 1) {
                        streak++;
                        currentDate = prevDate;
                    } else {
                        break;
                    }
                }
            }
        }

        // Get entries this month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const entriesThisMonth = await Journal.countDocuments({
            user: userId,
            createdAt: { $gte: firstDayOfMonth }
        });

        // Self-care minutes (placeholder - would need to track activity completion)
        const selfCareMinutes = 0;

        // Calculate days active
        const user = await User.findById(userId);
        const daysActive = Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));

        // ...

        // Get total moods
        const totalMoods = await Mood.countDocuments({ userId: userId });

        res.json({
            success: true,
            stats: {
                journalStreak: streak,
                entriesThisMonth: entriesThisMonth,
                selfCareMinutes: selfCareMinutes,
                totalEntries: journals.length,
                daysActive: daysActive,
                totalMoods: totalMoods
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update fields
        user.name = req.body.name || user.name;

        // If password is being updated
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
            message: 'Profile updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Change user password
// @route   PUT /api/user/password
// @access  Private
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400);
            throw new Error('Please provide current and new passwords');
        }

        if (newPassword.length < 6) {
            res.status(400);
            throw new Error('New password must be at least 6 characters');
        }

        // Get user with password field
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Check if current password matches
        const isMatch = await user.matchPassword(currentPassword);

        if (!isMatch) {
            res.status(401);
            throw new Error('Current password is incorrect');
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user account and all data
// @route   DELETE /api/user/account
// @access  Private
export const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Delete all user's journal entries
        await Journal.deleteMany({ user: userId });

        // Delete the user account
        await User.findByIdAndDelete(userId);

        // Clear the auth cookie
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
