import Journal from '../models/Journal.js';
import { journalSchema } from '../utils/validation.js';

// @desc    Get all journals for current user
// @route   GET /api/journal
// @access  Private
export const getJournals = async (req, res, next) => {
    try {
        const journals = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(journals);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
export const getJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            res.status(404);
            throw new Error('Journal not found');
        }

        // Check user ownership
        if (journal.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        res.status(200).json(journal);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new journal entry
// @route   POST /api/journal
// @access  Private
export const createJournal = async (req, res, next) => {
    try {
        const result = journalSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400);
            throw new Error(result.error.errors[0].message);
        }

        const { content, mood, tags, isPrivate } = result.data;

        const journal = await Journal.create({
            user: req.user.id,
            content,
            mood,
            tags,
            isPrivate: isPrivate !== undefined ? isPrivate : true,
        });

        res.status(201).json(journal);
    } catch (error) {
        console.error('Create Journal Error:', error); // DEBUG
        next(error);
    }
};

// @desc    Update a journal entry
// @route   PUT /api/journal/:id
// @access  Private
export const updateJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            res.status(404);
            throw new Error('Journal not found');
        }

        // Check user ownership
        if (journal.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        const result = journalSchema.partial().safeParse(req.body);
        if (!result.success) {
            res.status(400);
            throw new Error(result.error.errors[0].message);
        }

        const updatedJournal = await Journal.findByIdAndUpdate(
            req.params.id,
            req.body, // In a real app we might want to be more selective
            { new: true }
        );

        res.status(200).json(updatedJournal);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
export const deleteJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            res.status(404);
            throw new Error('Journal not found');
        }

        if (journal.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await journal.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};
