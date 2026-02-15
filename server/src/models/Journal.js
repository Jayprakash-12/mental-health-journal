import mongoose from 'mongoose';

const journalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        content: {
            type: String,
            required: [true, 'Please add journal content'],
        },
        mood: {
            type: String, // e.g., 'Happy', 'Anxious', 'Calm'
            required: true,
        },
        tags: [String],
        isPrivate: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;
