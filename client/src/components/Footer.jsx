import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-8 px-4 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <span className="font-semibold text-slate-600">© 2026 MindfulAI</span>
                    <span className="hidden md:inline text-slate-300">|</span>
                    <span className="text-slate-400">All rights reserved</span>
                </div>

                <div className="flex items-center gap-8 font-medium">
                    <a href="#" className="hover:text-emerald-600 hover:underline decoration-emerald-200 underline-offset-4 transition-all">Privacy Policy</a>
                    <a href="#" className="hover:text-emerald-600 hover:underline decoration-emerald-200 underline-offset-4 transition-all">Terms of Service</a>
                    <a href="#" className="hover:text-emerald-600 hover:underline decoration-emerald-200 underline-offset-4 transition-all">Support</a>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <span>Made with</span>
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
                    <span>for mental wellness</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
