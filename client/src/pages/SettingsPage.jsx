import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, Shield, Trash2,
    ChevronRight, Eye, EyeOff, Lock, X, Check, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../lib/api';

const SettingsPage = () => {
    const { logout } = useAuth();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Change Password Modal State
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // Privacy Settings Modal State
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [privacySettings, setPrivacySettings] = useState({
        showProfile: true,
        allowDataCollection: true,
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        setPasswordLoading(true);

        try {
            await api.put('/api/user/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setPasswordSuccess(true);
            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordSuccess(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }, 2000);
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    const settingSections = [
        {
            title: 'Privacy & Security',
            icon: Shield,
            items: [
                {
                    id: 'password',
                    label: 'Change Password',
                    description: 'Update your account password',
                    type: 'link',
                    onClick: () => setShowPasswordModal(true),
                },
                {
                    id: 'privacy',
                    label: 'Privacy Settings',
                    description: 'Manage your data and privacy',
                    type: 'link',
                    onClick: () => setShowPrivacyModal(true),
                },
            ],
        },
    ];

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Settings className="w-8 h-8 text-slate-600" />
                        Settings
                    </h1>
                    <p className="text-slate-500 mt-1">Customize your experience</p>
                </div>

                {/* Settings Sections */}
                {settingSections.map((section, sectionIndex) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                    >
                        {/* Section Header */}
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                            <section.icon className="w-5 h-5 text-slate-600" />
                            <h2 className="font-semibold text-slate-800">{section.title}</h2>
                        </div>

                        {/* Section Items */}
                        <div className="divide-y divide-slate-100">
                            {section.items.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={item.type === 'link' ? item.onClick : undefined}
                                    className={`px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition ${item.type === 'link' ? 'cursor-pointer' : ''
                                        }`}
                                >
                                    <div>
                                        <p className="font-medium text-slate-800">{item.label}</p>
                                        <p className="text-sm text-slate-500">{item.description}</p>
                                    </div>

                                    {item.type === 'toggle' && (
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={item.onChange}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${item.value ? 'bg-emerald-500' : 'bg-slate-300'
                                                }`}
                                        >
                                            <motion.div
                                                animate={{ x: item.value ? 24 : 2 }}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                            />
                                        </motion.button>
                                    )}

                                    {item.type === 'link' && (
                                        <div className="p-2 text-slate-400">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden"
                >
                    <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <h2 className="font-semibold text-red-800">Danger Zone</h2>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800">Delete Account</p>
                                <p className="text-sm text-slate-500">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition"
                            >
                                Delete Account
                            </motion.button>
                        </div>

                        {showDeleteConfirm && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-4 bg-red-50 rounded-xl border border-red-200"
                            >
                                <p className="text-red-800 font-medium mb-3">
                                    Are you sure? This action cannot be undone. All your journal entries will be permanently deleted.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.delete('/api/user/account');
                                                logout();
                                            } catch (error) {
                                                console.error('Failed to delete account:', error);
                                                alert('Failed to delete account. Please try again.');
                                            }
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Yes, Delete My Account
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* App Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center py-8 text-slate-400 text-sm"
                >
                    <p>MindfulAI v1.0.0</p>
                    <p className="mt-1">Made with ❤️ for your mental wellness</p>
                </motion.div>
            </motion.div>

            {/* Change Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowPasswordModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-slate-800">Change Password</h3>
                                <button
                                    onClick={() => setShowPasswordModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            {passwordSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <p className="text-slate-800 font-medium">Password changed successfully!</p>
                                </div>
                            ) : (
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    {passwordError && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            {passwordError}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                required
                                                className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordModal(false)}
                                            className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className="flex-1 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                                        >
                                            {passwordLoading ? 'Changing...' : 'Change Password'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Privacy Settings Modal */}
            <AnimatePresence>
                {showPrivacyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowPrivacyModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-slate-800">Privacy Settings</h3>
                                <button
                                    onClick={() => setShowPrivacyModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="font-medium text-slate-800">Profile Visibility</p>
                                        <p className="text-sm text-slate-500">Allow others to see your profile</p>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setPrivacySettings({ ...privacySettings, showProfile: !privacySettings.showProfile })}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${privacySettings.showProfile ? 'bg-emerald-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <motion.div
                                            animate={{ x: privacySettings.showProfile ? 24 : 2 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </motion.button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="font-medium text-slate-800">Data Collection</p>
                                        <p className="text-sm text-slate-500">Help improve the app with usage data</p>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setPrivacySettings({ ...privacySettings, allowDataCollection: !privacySettings.allowDataCollection })}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${privacySettings.allowDataCollection ? 'bg-emerald-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <motion.div
                                            animate={{ x: privacySettings.allowDataCollection ? 24 : 2 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </motion.button>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => setShowPrivacyModal(false)}
                                        className="w-full py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout >
    );
};

export default SettingsPage;
