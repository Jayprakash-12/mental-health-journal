import { motion } from 'framer-motion';
import { Heart, Brain, Smile, TrendingUp } from 'lucide-react';
import { itemVariants } from '../../data/dashboardData';

const WellnessTips = () => {
    const tips = [
        {
            icon: Heart,
            title: "Self-Compassion",
            content: "Treat yourself with the same kindness you'd offer a good friend. You deserve care and understanding.",
            color: "bg-rose-50 text-rose-600"
        },
        {
            icon: Brain,
            title: "Mental Breaks",
            content: "Taking regular breaks helps your brain process information and reduces stress. Even 5 minutes counts!",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Smile,
            title: "Gratitude Practice",
            content: "Notice three good things each day. Training your brain to spot positives improves overall well-being.",
            color: "bg-amber-50 text-amber-600"
        },
        {
            icon: TrendingUp,
            title: "Progress Over Perfection",
            content: "Small steps forward matter more than perfect execution. Celebrate your effort and growth.",
            color: "bg-emerald-50 text-emerald-600"
        }
    ];

    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Mental Wellness Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                        <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center mb-4`}>
                            <tip.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{tip.content}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WellnessTips;
