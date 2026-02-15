import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Book, MessageSquare, LogOut,
    User, ChevronDown, Settings, Bell, Menu, X,
    Heart
} from 'lucide-react';

const Layout = ({ children, fullWidth = false }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Book, label: 'Journal', path: '/journal' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 80 : 288 }}
                className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-white/80 backdrop-blur-xl border-r border-slate-200 z-40 shadow-sm h-screen"
            >
                <div
                    className="p-6 flex items-center gap-3 cursor-pointer hover:bg-slate-50/50 transition-colors group"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shrink-0 shadow-emerald-500/20 shadow-lg">
                        <Heart className="w-5 h-5 text-white" />
                    </div>
                    {!sidebarCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-xl text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600"
                        >
                            MindfulAI
                        </motion.span>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${location.pathname === item.path ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'
                                }`} />
                            {!sidebarCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {location.pathname === item.path && !sidebarCollapsed && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={logout}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-colors ${sidebarCollapsed ? 'justify-center' : ''
                            } text-red-500 hover:bg-red-50`}
                    >
                        <LogOut className="w-5 h-5" />
                        {!sidebarCollapsed && <span className="font-medium">Logout</span>}
                    </button>

                </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
                animate={{ marginLeft: sidebarCollapsed ? 80 : 288 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                className={`flex-1 hidden md:block min-h-screen ${fullWidth ? 'p-0' : 'p-6 md:p-8'} overflow-y-auto overflow-x-hidden`}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={fullWidth ? "w-full" : "max-w-6xl mx-auto"}
                >
                    {children}
                </motion.div>
            </motion.main>

            {/* Mobile Content Wrapper (No Margin) */}
            <main className="md:hidden flex-1 w-full pt-16 pb-20 px-4 overflow-y-auto">
                {children}
            </main>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 z-30 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">MindfulAI</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {getInitials(user?.name)}
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 pt-20 space-y-2 flex-1 overflow-y-auto">
                                {navItems.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${location.pathname === item.path
                                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-emerald-600' : 'text-slate-400'}`} />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="p-6 border-t border-slate-100">
                                <button
                                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                                    className="flex items-center gap-3 p-4 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 flex justify-around p-2 z-30 pb-safe">
                {navItems.slice(0, 4).map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${location.pathname === item.path
                            ? 'text-emerald-600 bg-emerald-50 scale-105'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
