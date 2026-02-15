import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Wind, Pen, TrendingUp } from 'lucide-react'; // Kept necessary icons
import { useAuth } from '../context/AuthContext';
import { getJournals } from '../services/journalService';
import { logMood, getMoodStats, getUserStats } from '../services/moodService';
import Layout from '../components/Layout';
import SelfCareModal from '../components/SelfCareModal';
import Footer from '../components/Footer';
import DashboardHero from '../components/dashboard/DashboardHero';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuickActions from '../components/dashboard/QuickActions';
import RecentJournals from '../components/dashboard/RecentJournals';
import MindfulMoments from '../components/dashboard/MindfulMoments';
import WellnessTips from '../components/dashboard/WellnessTips';
import { containerVariants, floatVariants, selfCareActivities } from '../data/dashboardData';

const Dashboard = () => {
    const { user } = useAuth();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [recentJournals, setRecentJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [moodStats, setMoodStats] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodSubmitted, setMoodSubmitted] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const journalsPromise = getJournals().catch(err => {
                console.error('Error fetching journals:', err);
                return [];
            });

            const statsPromise = getUserStats().catch(err => {
                console.error('Error fetching user stats:', err);
                return { success: false, stats: null };
            });

            const moodStatsPromise = getMoodStats().catch(err => {
                console.error('Error fetching mood stats:', err);
                return null;
            });

            const [journalsData, userStatsData, moodStatsData] = await Promise.all([
                journalsPromise,
                statsPromise,
                moodStatsPromise
            ]);

            if (Array.isArray(journalsData)) {
                setRecentJournals(journalsData.slice(0, 3));
            }

            if (userStatsData && userStatsData.stats) {
                setStats(userStatsData.stats);
            }

            if (moodStatsData) {
                setMoodStats(moodStatsData);
            }
        } catch (error) {
            console.error('Critical error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMoodSelect = async (mood) => {
        setSelectedMood(mood);
        try {
            await logMood(mood);
            setMoodSubmitted(true);
            setTimeout(() => setMoodSubmitted(false), 3000);
            const updated = await getMoodStats();
            setMoodStats(updated);
        } catch (error) {
            console.error('Error logging mood:', error);
        }
    };

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const quickActions = useMemo(() => [
        {
            icon: Wind,
            label: 'Breathe',
            desc: 'Calm down',
            img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            action: () => setSelectedActivity(selfCareActivities[0])
        },
        {
            icon: Pen,
            label: 'Journal',
            desc: 'Write thoughts',
            img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/journal?new=true'
        },
        {
            icon: MessageCircle,
            label: 'Chat',
            desc: 'Talk to AI',
            img: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            link: '/chat'
        },
        {
            icon: TrendingUp,
            label: 'Mood',
            desc: 'Log feeling',
            img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            action: () => document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' })
        }
    ], []);

    return (
        <Layout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-slate-50 relative flex flex-col"
            >
                {/* Background Blobs */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">

                    <DashboardHero
                        user={user}
                        greeting={greeting()}
                        selectedMood={selectedMood}
                        handleMoodSelect={handleMoodSelect}
                    />

                    <QuickActions actions={quickActions} />

                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                            <WellnessTips />
                            <RecentJournals journals={recentJournals} />
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <MindfulMoments onSelectActivity={setSelectedActivity} />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {selectedActivity && (
                        <SelfCareModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
                    )}
                </AnimatePresence>

                <Link to="/chat">
                    <motion.div
                        variants={floatVariants}
                        animate="animate"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center cursor-pointer group"
                    >
                        <MessageCircle className="w-7 h-7 text-white" />
                        <span className="absolute right-full mr-4 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Dr. AI
                        </span>
                    </motion.div>
                </Link>
                <Footer />
            </motion.div>
        </Layout>
    );
};

export default Dashboard;
