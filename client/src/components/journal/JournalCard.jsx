import { motion } from 'framer-motion';
import { Calendar, Edit2, Trash2 } from 'lucide-react';

const JournalCard = ({ journal, onEdit, onDelete, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClick}
            className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow group relative cursor-pointer"
        >
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">
                        {{
                            'Happy': '😊',
                            'Calm': '🌿',
                            'Neutral': '😐',
                            'Anxious': '😟',
                            'Sad': '😔'
                        }[journal.mood] || '📝'}
                    </span>
                    <span className="font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded-md text-sm">{journal.mood}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(journal.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(journal); }}
                            className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Edit Entry"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(journal._id); }}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Entry"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-slate-600 whitespace-pre-wrap break-words overflow-hidden">{journal.content}</p>
        </motion.div>
    );
};

export default JournalCard;
