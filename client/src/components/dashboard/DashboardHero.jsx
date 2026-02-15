import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moodEmojis, itemVariants, heroImages } from '../../data/dashboardData';

const DashboardHero = ({ user, greeting, selectedMood, handleMoodSelect }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2.5rem] shadow-2xl min-h-[400px] flex flex-col justify-center p-8 md:p-16 group"
        >
            {/* Hero Background Image Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImage}
                        src={heroImages[currentImage]}
                        alt="Serene Background"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-transparent z-10" />
            </div>

            <div className="relative z-10 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-4"
                >
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-emerald-50 text-xs font-bold tracking-wide uppercase border border-white/10">
                        Mental Wellness
                    </span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {greeting}, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-100">
                        {user?.name?.split(' ')[0] || 'Friend'}
                    </span>
                </h1>

                {/* Mood Selector */}
                <div id="mood-selector" className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 inline-block">
                    <p className="text-emerald-50 text-sm font-medium mb-4 uppercase tracking-wider opacity-80">How are you feeling?</p>
                    <div className="flex gap-4">
                        {moodEmojis.map((mood) => (
                            <motion.button
                                key={mood.value}
                                whileHover={{ scale: 1.15, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleMoodSelect(mood.value)}
                                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-all shadow-lg ${selectedMood === mood.value
                                    ? 'bg-white scale-110 ring-4 ring-emerald-400/50'
                                    : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                title={mood.label}
                            >
                                {mood.emoji}
                                {selectedMood === mood.value && (
                                    <motion.div
                                        layoutId="activeMood"
                                        className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardHero;
