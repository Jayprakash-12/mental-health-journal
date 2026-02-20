import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit3, Save, X, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../lib/api';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [stats, setStats] = useState({
        journalEntries: 0,
        aiSessions: 0,
        daysActive: 0,
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    // Update formData when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);

    // Fetch user stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/user/stats');
                console.log('Stats API response:', response.data);
                if (response.data && response.data.stats) {
                    setStats({
                        journalEntries: response.data.stats.totalEntries || 0,
                        aiSessions: response.data.stats.aiSessions || 0,
                        daysActive: response.data.stats.daysActive || 0,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.put('/user/profile', { name: formData.name });
            setIsEditing(false);
            // Update local user state if needed
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const statsDisplay = [
        { label: 'Journal Entries', value: stats?.journalEntries ?? 0, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'AI Sessions', value: stats?.aiSessions ?? 0, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
                        <p className="text-slate-500 mt-1">Manage your personal information</p>
                    </div>
                </div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative">
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Avatar & Info */}
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
                            {/* Avatar */}
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white"
                                >
                                    {getInitials(user?.name)}
                                </motion.div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-emerald-600 transition">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Name & Actions */}
                            <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{user?.name}</h2>
                                    <p className="text-slate-500 flex items-center gap-2 mt-1">
                                        <Mail className="w-4 h-4" />
                                        {user?.email}
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition ${isEditing
                                        ? 'bg-slate-100 text-slate-600'
                                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                        }`}
                                >
                                    {isEditing ? (
                                        <>
                                            <X className="w-4 h-4" /> Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Edit3 className="w-4 h-4" /> Edit Profile
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {statsDisplay.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className={`${stat.bg} rounded-xl p-4 text-center`}
                                >
                                    {isLoading ? (
                                        <Loader2 className={`w-6 h-6 ${stat.color} animate-spin mx-auto`} />
                                    ) : (
                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                    )}
                                    <p className="text-sm text-slate-600">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Edit Form */}
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
                    >
                        <h3 className="text-lg font-semibold text-slate-800 mb-6">Edit Information</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                        placeholder="Your name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-slate-50"
                                        placeholder="your@email.com"
                                        disabled
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Email cannot be changed</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Account Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
                >
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Account Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-600">Member Since</span>
                            </div>
                            <span className="text-slate-800 font-medium">
                                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-600">Account Status</span>
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                                Active
                            </span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
};

export default ProfilePage;
