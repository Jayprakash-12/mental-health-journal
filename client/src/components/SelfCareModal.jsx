import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wind, Eye, Heart, MessageCircle, Coffee, Pen, Star, X } from 'lucide-react';
import { affirmationsList, journalPrompts } from '../data/dashboardData';

const SelfCareModal = memo(({ activity, onClose }) => {
    const [groundingChecks, setGroundingChecks] = useState([false, false, false, false, false]);
    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    const [bodyScanStep, setBodyScanStep] = useState(0);
    const [currentPrompt] = useState(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);

    if (!activity) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    {/* Background */}
                    <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br ${activity.color} opacity-10`} />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-6 h-6 text-slate-500" />
                    </button>

                    <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-6 shadow-lg`}>
                            <activity.icon className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{activity.title}</h2>
                        <p className="text-slate-600 mb-6">{activity.description}</p>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            {/* Breathing */}
                            {activity.id === 'breathing' && (
                                <div className="text-center py-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1.5, 1], opacity: [0.5, 1, 1, 0.5] }}
                                        transition={{ duration: 19, repeat: Infinity, times: [0, 0.21, 0.58, 1], ease: "easeInOut" }}
                                        className="w-36 h-36 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 rounded-full mx-auto mb-6 flex items-center justify-center relative"
                                    >
                                        <motion.div
                                            animate={{ scale: [0.8, 1.2, 1.2, 0.8] }}
                                            transition={{ duration: 19, repeat: Infinity, times: [0, 0.21, 0.58, 1] }}
                                            className="w-28 h-28 bg-blue-500/30 rounded-full absolute"
                                        />
                                        <Wind className="w-12 h-12 text-blue-600" />
                                    </motion.div>
                                    <div className="flex justify-center gap-4 mb-6">
                                        <div className="text-center"><span className="text-2xl font-bold text-blue-600">4</span><p className="text-xs text-slate-500">Inhale</p></div>
                                        <div className="text-center"><span className="text-2xl font-bold text-indigo-600">7</span><p className="text-xs text-slate-500">Hold</p></div>
                                        <div className="text-center"><span className="text-2xl font-bold text-purple-600">8</span><p className="text-xs text-slate-500">Exhale</p></div>
                                    </div>
                                    <p className="text-sm text-slate-500">Complete 3-4 cycles</p>
                                </div>
                            )}

                            {/* Grounding */}
                            {activity.id === 'grounding' && (
                                <div className="space-y-3">
                                    <p className="font-medium text-emerald-700 mb-3">Tap each step:</p>
                                    {[
                                        { count: 5, text: "Things you can SEE" },
                                        { count: 4, text: "Things you can TOUCH" },
                                        { count: 3, text: "Things you can HEAR" },
                                        { count: 2, text: "Things you can SMELL" },
                                        { count: 1, text: "Thing you can TASTE" },
                                    ].map((step, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                const newChecks = [...groundingChecks];
                                                newChecks[i] = !newChecks[i];
                                                setGroundingChecks(newChecks);
                                            }}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${groundingChecks[i] ? 'bg-emerald-100 border-2 border-emerald-400' : 'bg-white border border-slate-200'}`}
                                        >
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${groundingChecks[i] ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                {groundingChecks[i] ? '✓' : step.count}
                                            </span>
                                            <span className={`font-medium ${groundingChecks[i] ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>{step.text}</span>
                                        </motion.button>
                                    ))}
                                    {groundingChecks.every(c => c) && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-emerald-600 font-medium mt-4">🎉 Great job! You're grounded.</motion.p>
                                    )}
                                </div>
                            )}

                            {/* Break */}
                            {activity.id === 'break' && (
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { emoji: "💧", title: "Drink Water", tip: "Hydration boosts focus" },
                                        { emoji: "👀", title: "20-20-20 Rule", tip: "Look 20ft away for 20s" },
                                        { emoji: "🙆", title: "Stretch", tip: "Roll shoulders & neck" },
                                        { emoji: "🌬️", title: "Deep Breaths", tip: "3 slow, deep breaths" },
                                        { emoji: "🚶", title: "Short Walk", tip: "Even 2 min helps" },
                                        { emoji: "🎵", title: "Listen to Music", tip: "One calming song" },
                                    ].map((item, i) => (
                                        <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-4 bg-white rounded-xl border border-slate-100 hover:border-amber-200 cursor-pointer">
                                            <div className="text-2xl mb-2">{item.emoji}</div>
                                            <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{item.tip}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Body Scan */}
                            {activity.id === 'bodyscan' && (
                                <div className="space-y-3">
                                    <p className="text-center text-purple-600 font-medium mb-4">Focus on each body part:</p>
                                    {[
                                        { part: "Head & Face", instruction: "Relax forehead, jaw, eyes" },
                                        { part: "Neck & Shoulders", instruction: "Release any tightness" },
                                        { part: "Arms & Hands", instruction: "Let them feel heavy" },
                                        { part: "Chest & Stomach", instruction: "Breathe deeply" },
                                        { part: "Back & Spine", instruction: "Feel support beneath you" },
                                        { part: "Legs & Feet", instruction: "Release muscle tension" },
                                    ].map((step, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => setBodyScanStep(i)}
                                            className={`w-full text-left p-4 rounded-xl transition-all ${bodyScanStep === i ? 'bg-purple-100 border-2 border-purple-400' : 'bg-white border border-slate-200'}`}
                                        >
                                            <span className={`font-semibold ${bodyScanStep === i ? 'text-purple-700' : 'text-slate-700'}`}>{step.part}</span>
                                            <p className="text-sm text-slate-500 mt-1">{step.instruction}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Journal Prompt */}
                            {activity.id === 'journalprompt' && (
                                <div className="text-center space-y-6">
                                    <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-rose-200">
                                        <Pen className="w-8 h-8 text-rose-400 mx-auto mb-4" />
                                        <p className="text-xl font-medium text-slate-700 italic">"{currentPrompt}"</p>
                                    </div>
                                    <Link to="/journal" onClick={onClose} className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition font-medium">
                                        <Pen className="w-4 h-4" /> Open Journal
                                    </Link>
                                </div>
                            )}

                            {/* Affirmations */}
                            {activity.id === 'affirmations' && (
                                <div className="text-center space-y-6">
                                    <motion.div key={currentAffirmation} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-amber-100">
                                        <Star className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                                        <p className="text-2xl font-semibold text-slate-700">{affirmationsList[currentAffirmation]}</p>
                                    </motion.div>
                                    <div className="flex justify-center gap-2">
                                        {affirmationsList.map((_, i) => (
                                            <button key={i} onClick={() => setCurrentAffirmation(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentAffirmation ? 'bg-amber-500 w-6' : 'bg-amber-200'}`} />
                                        ))}
                                    </div>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentAffirmation((prev) => (prev + 1) % affirmationsList.length)} className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition font-medium">
                                        Next Affirmation ✨
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

SelfCareModal.displayName = 'SelfCareModal';

export default SelfCareModal;
