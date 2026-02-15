import api from '../lib/api';

// Log a new mood entry
export const logMood = async (mood, note = '') => {
    try {
        const response = await api.post('/mood', { mood, note });
        return response.data;
    } catch (error) {
        console.error('Error logging mood:', error);
        throw error;
    }
};

// Get mood history (last 7 days)
export const getMoodHistory = async () => {
    try {
        const response = await api.get('/mood/history');
        return response.data;
    } catch (error) {
        console.error('Error fetching mood history:', error);
        throw error;
    }
};

// Get mood statistics
export const getMoodStats = async () => {
    try {
        const response = await api.get('/mood/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching mood stats:', error);
        throw error;
    }
};

// Get user statistics (streak, entries, etc.)
export const getUserStats = async () => {
    try {
        const response = await api.get('/user/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error;
    }
};
