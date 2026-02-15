import { motion } from 'framer-motion';

const moods = [
    { label: 'Happy', emoji: '😊', color: 'bg-green-100 text-green-600' },
    { label: 'Calm', emoji: '🌿', color: 'bg-teal-100 text-teal-600' },
    { label: 'Neutral', emoji: '😐', color: 'bg-slate-100 text-slate-600' },
    { label: 'Anxious', emoji: '😟', color: 'bg-orange-100 text-orange-600' },
    { label: 'Sad', emoji: '😔', color: 'bg-blue-100 text-blue-600' },
];

const MoodTracker = ({ selected, onSelect }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-4 justify-between sm:justify-start">
                {moods.map((mood) => (
                    <motion.button
                        key={mood.label}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(mood.label)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all w-20 ${selected === mood.label
                            ? `ring-2 ring-offset-2 ring-slate-400 ${mood.color}`
                            : 'hover:bg-slate-50'
                            }`}
                    >
                        <span className="text-2xl" role="img" aria-label={mood.label}>
                            {mood.emoji}
                        </span>
                        <span className="text-xs font-medium text-slate-600">{mood.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default MoodTracker;
