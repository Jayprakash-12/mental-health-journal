import { generateChatResponse } from '../services/chatService.js';

// @desc    Send message to AI Assistant
// @route   POST /api/chat
// @access  Private
export const sendMessage = async (req, res, next) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            res.status(400);
            throw new Error('Messages array is required and cannot be empty');
        }

        // Basic validation of message structure
        const isValid = messages.every(msg =>
            msg.role && (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system') && typeof msg.content === 'string'
        );

        if (!isValid) {
            res.status(400);
            throw new Error('Invalid message format. Expected { role, content }');
        }

        const aiResponse = await generateChatResponse(messages);

        res.status(200).json(aiResponse);
    } catch (error) {
        next(error);
    }
};
