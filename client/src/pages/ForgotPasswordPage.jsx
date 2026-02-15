import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [resetInfo, setResetInfo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/forgot-password', { email });
            setSuccess(true);
            // For development only - shows reset link
            setResetInfo(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Back Link */}
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                    Back to Login
                </Link>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">MindfulAI</h1>
                    </div>

                    {!success ? (
                        <>
                            <h2 className="text-xl font-semibold text-slate-800 text-center mb-2">
                                Forgot Password?
                            </h2>
                            <p className="text-slate-500 text-center mb-8">
                                Enter your email and we'll send you a reset link
                            </p>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                Check Your Email
                            </h2>
                            <p className="text-slate-500 mb-6">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>

                            {/* Development only - show reset link */}
                            {resetInfo && (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left mb-6">
                                    <p className="text-amber-800 text-sm font-medium mb-2">
                                        🔧 Development Mode - Reset Link:
                                    </p>
                                    <Link
                                        to={`/reset-password/${resetInfo.resetToken}`}
                                        className="text-emerald-600 text-sm break-all hover:underline"
                                    >
                                        Click here to reset password
                                    </Link>
                                </div>
                            )}

                            <Link
                                to="/login"
                                className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
