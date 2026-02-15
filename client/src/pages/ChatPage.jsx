import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { sendMessage } from '../services/chatService';
import Layout from '../components/Layout';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello. I'm here to listen and support you. How are you feeling right now?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            // Format messages for API (remove UI-specific fields if any, strictly role/content)
            const apiMessages = newMessages
                .filter(msg => msg.role && msg.content) // Filter out any invalid/empty messages
                .map(({ role, content }) => ({ role, content }));

            const response = await sendMessage(apiMessages);

            setMessages(prev => [...prev, response]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-indigo-600" />
                        AI Support Assistant
                    </h2>
                    <p className="text-xs text-slate-500 pl-7">Always here to listen, private & secure.</p>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-indigo-600" />
                                    </div>
                                )}

                                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-slate-800 text-white rounded-tr-none'
                                    : 'bg-slate-100 text-slate-700 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>

                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                        <User className="w-5 h-5 text-slate-600" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3 justify-start"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                <span className="text-xs text-slate-400">Thinking...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <form onSubmit={handleSend} className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ChatPage;
