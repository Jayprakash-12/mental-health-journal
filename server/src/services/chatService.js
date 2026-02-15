import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API Key not configured");
    }
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

const SYSTEM_INSTRUCTION = `
You are an AI Mental Wellness Support Assistant embedded in a private, minimalist mental health journaling web application.

YOUR ROLE:
Provide empathetic, calm, and non-judgmental support.
Encourage emotional reflection and journaling.
Help users explore thoughts and feelings safely.
Suggest healthy coping and grounding techniques.

YOU ARE NOT:
A therapist, psychologist, or medical professional.

COMMUNICATION STYLE:
Warm, calm, supportive, minimalist, and clear.
Respectful and non-assumptive.
Avoid absolute statements and clinical language.

SAFETY & CRISIS HANDLING:
If user implies self-harm or suicide:
1. Respond with empathy and seriousness.
2. State you cannot help with harming themselves.
3. Encourage reaching out to professional/crisis support.
4. Keep language calm and non-alarmist.

PRIMARY GOAL:
Provide a safe, ethical support experience that helps users reflect on emotions and build self-awareness.
`;

export const generateChatResponse = async (messages) => {
    try {
        const genAI = getGeminiClient();

        // CHANGE: gemini-1.5 is shut down. 
        // Use 'gemini-3-flash-preview' or 'gemini-2.5-flash'.
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // 1. Map roles to SDK requirements
        let history = messages.map(msg => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        // 2. SDK Requirement: History MUST start with a "user" message.
        // If your DB has an assistant message first, remove it for this session.
        while (history.length > 0 && history[0].role === "model") {
            history.shift();
        }

        // 3. Separate the last message from the history
        if (history.length === 0) throw new Error("No user message found in history.");
        const lastUserMessage = history.pop().parts[0].text;

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(lastUserMessage);
        const responseText = result.response.text();

        return {
            role: "assistant",
            content: responseText,
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error(`AI Assistant Error: ${error.message}`);
    }
};