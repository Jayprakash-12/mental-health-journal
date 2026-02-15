import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Sun } from 'lucide-react';
import { itemVariants, selfCareActivities } from '../../data/dashboardData';

const MindfulMoments = ({ onSelectActivity }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Mindful Moments</h2>

            {/* Mindful Cards */}
            {selfCareActivities.slice(0, 3).map((activity) => (
                <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => onSelectActivity(activity)}
                    className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4 p-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            <activity.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{activity.title}</h3>
                            <p className="text-xs text-slate-500 mt-1">{activity.duration}</p>
                        </div>
                        <div className="ml-auto">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Daily Insight Card */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl mt-8">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 opacity-80">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Daily Insight</span>
                    </div>
                    <p className="text-lg font-medium leading-relaxed mb-6">"You are capable of handling whatever this week throws at you. Breathe."</p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Sun className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium opacity-90">Dr. AI Tip</span>
                    </div>
                </div>
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-xl -ml-10 -mb-5" />
            </motion.div>
        </div>
    );
};

export default MindfulMoments;
