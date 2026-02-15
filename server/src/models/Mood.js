import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        // 1: Very Sad (😢), 2: Sad (😰), 3: Neutral (😐), 4: Happy (😊), 5: Very Happy (😄)
    },
    note: {
        type: String,
        maxlength: 500
    }
}, {
    timestamps: true
});

// Index for faster queries
moodSchema.index({ userId: 1, createdAt: -1 });

const Mood = mongoose.model('Mood', moodSchema);

export default Mood;
