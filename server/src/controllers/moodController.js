import Mood from '../models/Mood.js';

// Log a new mood entry
export const logMood = async (req, res) => {
    try {
        const { mood, note } = req.body;
        const userId = req.user._id;

        if (!mood || mood < 1 || mood > 5) {
            return res.status(400).json({ message: 'Mood must be between 1 and 5' });
        }

        const newMood = new Mood({
            userId,
            mood,
            note: note || ''
        });

        await newMood.save();

        res.status(201).json({
            message: 'Mood logged successfully',
            mood: newMood
        });
    } catch (error) {
        console.error('Error logging mood:', error);
        res.status(500).json({ message: 'Failed to log mood' });
    }
};

// Get mood history for the last 7 days
export const getMoodHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const moods = await Mood.find({
            userId,
            createdAt: { $gte: sevenDaysAgo }
        }).sort({ createdAt: -1 });

        res.json(moods);
    } catch (error) {
        console.error('Error fetching mood history:', error);
        res.status(500).json({ message: 'Failed to fetch mood history' });
    }
};

// Get mood statistics
export const getMoodStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const moods = await Mood.find({
            userId,
            createdAt: { $gte: sevenDaysAgo }
        });

        if (moods.length === 0) {
            return res.json({
                averageMood: 0,
                totalEntries: 0,
                trend: 'neutral'
            });
        }

        // Calculate average mood
        const totalMood = moods.reduce((sum, m) => sum + m.mood, 0);
        const averageMood = (totalMood / moods.length).toFixed(1);

        // Calculate trend (comparing first half vs second half of week)
        const midPoint = Math.floor(moods.length / 2);
        const firstHalf = moods.slice(0, midPoint);
        const secondHalf = moods.slice(midPoint);

        const firstHalfAvg = firstHalf.reduce((sum, m) => sum + m.mood, 0) / (firstHalf.length || 1);
        const secondHalfAvg = secondHalf.reduce((sum, m) => sum + m.mood, 0) / (secondHalf.length || 1);

        let trend = 'neutral';
        if (secondHalfAvg > firstHalfAvg + 0.5) trend = 'improving';
        else if (secondHalfAvg < firstHalfAvg - 0.5) trend = 'declining';

        res.json({
            averageMood: parseFloat(averageMood),
            totalEntries: moods.length,
            trend
        });
    } catch (error) {
        console.error('Error calculating mood stats:', error);
        res.status(500).json({ message: 'Failed to calculate mood statistics' });
    }
};
