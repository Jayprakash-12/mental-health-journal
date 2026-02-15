import { Brain, Heart, Leaf, Moon, Wind, Coffee, Activity, Pen, Star } from 'lucide-react';

// Animation Variants
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 12 }
    }
};

export const floatVariants = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.8, 0.5],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Mental Health Tips
export const mentalHealthTips = [
    {
        icon: Brain,
        title: "Mindful Breathing",
        tip: "Take 5 deep breaths. Inhale for 4 seconds, hold for 4, exhale for 6.",
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: Heart,
        title: "Self-Compassion",
        tip: "Speak to yourself like you would to a good friend.",
        color: "from-rose-500 to-pink-500"
    },
    {
        icon: Leaf,
        title: "Grounding Technique",
        tip: "Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
        color: "from-emerald-500 to-teal-500"
    },
    {
        icon: Moon,
        title: "Sleep Hygiene",
        tip: "Aim for 7-9 hours of sleep with a consistent schedule.",
        color: "from-indigo-500 to-blue-500"
    }
];

// Self Care Activities
export const selfCareActivities = [
    {
        id: 'breathing',
        title: "Breathing Exercise",
        description: "4-7-8 technique: Inhale 4s, Hold 7s, Exhale 8s.",
        icon: Wind,
        color: "from-blue-400 to-indigo-500",
        iconColor: "text-blue-500",
        duration: "3 min"
    },
    {
        id: 'grounding',
        title: "5-4-3-2-1 Grounding",
        description: "Anchor yourself to the present using your senses.",
        icon: Leaf,
        color: "from-emerald-400 to-teal-500",
        iconColor: "text-emerald-500",
        duration: "2 min"
    },
    {
        id: 'break',
        title: "Mindful Break",
        description: "Quick reset activities to refresh your mind.",
        icon: Coffee,
        color: "from-amber-400 to-orange-500",
        iconColor: "text-amber-600",
        duration: "5 min"
    },
    {
        id: 'bodyscan',
        title: "Body Scan",
        description: "Progressive relaxation from head to toe.",
        icon: Activity,
        color: "from-purple-400 to-pink-500",
        iconColor: "text-purple-500",
        duration: "5 min"
    },
    {
        id: 'journalprompt',
        title: "Journaling Prompt",
        description: "Reflect on a thought-provoking question.",
        icon: Pen,
        color: "from-rose-400 to-red-500",
        iconColor: "text-rose-500",
        duration: "10 min"
    },
    {
        id: 'affirmations',
        title: "Positive Affirmations",
        description: "Empower yourself with uplifting statements.",
        icon: Star,
        color: "from-yellow-400 to-amber-500",
        iconColor: "text-yellow-500",
        duration: "1 min"
    }
];

export const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment that made you smile recently.",
    "What's one thing you'd like to let go of?",
    "If you could tell your younger self one thing, what would it be?",
    "What does your ideal peaceful day look like?",
    "What's a challenge you overcame that made you stronger?"
];

export const affirmationsList = [
    "I am enough, just as I am.",
    "I choose peace over worry.",
    "I am worthy of love and kindness.",
    "I trust the journey, even when I don't understand it.",
    "I release what I cannot control.",
    "I am growing and evolving every day.",
    "My feelings are valid and important.",
    "I give myself permission to rest."
];

export const heroImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1501854140884-074bf6bfa802?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
];

export const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'bg-blue-100 border-blue-300' },
    { value: 2, emoji: '😰', label: 'Sad', color: 'bg-indigo-100 border-indigo-300' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-slate-100 border-slate-300' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'bg-yellow-100 border-yellow-300' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: 'bg-emerald-100 border-emerald-300' }
];
