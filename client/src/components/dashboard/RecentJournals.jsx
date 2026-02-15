import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Pen } from 'lucide-react';
import { itemVariants } from '../../data/dashboardData';

const RecentJournals = ({ journals }) => {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Journal</h2>
                    <p className="text-slate-500">Recent reflections and thoughts</p>
                </div>
                <Link to="/journal" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {journals.length > 0 ? (
                <div className="space-y-4">
                    {journals.map((journal) => (
                        <Link key={journal._id} to={`/journal/${journal._id}`}>
                            <motion.div
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="group flex gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <div className="flex flex-col items-center pt-1 min-w-[3rem]">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{new Date(journal.createdAt).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    <span className="text-2xl font-black text-emerald-600">{new Date(journal.createdAt).getDate()}</span>
                                </div>
                                <div className="flex-1 min-w-0 pb-4 border-b border-slate-100 group-hover:border-transparent">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors truncate">{journal.title}</h3>
                                    <p className="text-slate-500 line-clamp-2 leading-relaxed break-words">{journal.content?.substring(0, 150)}...</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Pen className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium mb-4">Your journal is waiting for your story</p>
                    <Link to="/journal?new=true" className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors">
                        Write First Entry
                    </Link>
                </div>
            )}
        </motion.div>
    );
};

export default RecentJournals;
