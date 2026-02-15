import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodTracker from '../MoodTracker';

const JournalForm = ({ isOpen, onClose, isEditing, initialData, onSubmit }) => {
    const [entry, setEntry] = useState({ content: '', mood: '', tags: [] });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && initialData) {
            setEntry(initialData);
        } else if (isOpen && !isEditing) {
            setEntry({ content: '', mood: '', tags: [] });
        }
    }, [isOpen, initialData, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(entry);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                            {isEditing ? 'Edit Entry' : 'New Entry'}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">How are you feeling?</label>
                            <MoodTracker selected={entry.mood} onSelect={(m) => setEntry({ ...entry, mood: m })} />
                        </div>
                        <div>
                            <textarea
                                value={entry.content}
                                onChange={(e) => setEntry({ ...entry, content: e.target.value })}
                                placeholder="Write your thoughts here..."
                                className="w-full h-40 p-4 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-slate-200 resize-none font-medium text-slate-700 placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!entry.content || !entry.mood || isSubmitting}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? 'Saving...' : (isEditing ? 'Update Entry' : 'Save Entry')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JournalForm;
