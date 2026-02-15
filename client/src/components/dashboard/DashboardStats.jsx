import { motion } from 'framer-motion';
import { Flame, Book, Clock } from 'lucide-react';
import { itemVariants } from '../../data/dashboardData';

const DashboardStats = ({ stats }) => {
    return (
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-3">
                    <Flame className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-800">{stats?.journalStreak || 0}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">Day Streak</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-3">
                    <Book className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-800">{stats?.totalEntries || 0}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">Journals</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-3">
                    <Clock className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-800">{stats?.totalMoods || 0}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">Moods</span>
            </div>
        </motion.div>
    );
};

export default DashboardStats;
