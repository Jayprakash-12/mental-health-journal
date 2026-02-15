import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import { getJournal, deleteJournal } from '../services/journalService';

const JournalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                // We don't have a specific getJournal(id) in service yet, so we reuse getJournals and find?
                // Or implementing a specific endpoint is better.
                // For now, let's assume getJournals returns all and we filter, OR we implement getJournal.
                // Actually, backend likely supports get by ID.
                // Let's implement fetch logic.
                // I'll assume getJournal(id) exists or I will create it.
                // Let's check service first.
                // For now, I'll write the component assuming getJournal(id) exists.
                // If not, I'll update service.
                const data = await getJournal(id);
                setJournal(data);
            } catch (error) {
                console.error('Failed to load journal', error);
                // navigate('/dashboard'); // fallback?
            } finally {
                setLoading(false);
            }
        };
        fetchJournal();
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            await deleteJournal(id);
            navigate('/journal');
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    if (loading) return (
        <Layout>
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        </Layout>
    );

    if (!journal) return (
        <Layout>
            <div className="text-center py-12">
                <p className="text-slate-500">Journal entry not found.</p>
                <Link to="/journal" className="text-emerald-600 hover:underline mt-4 inline-block">Back to Journal</Link>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <span className="text-sm font-medium text-slate-400">Back to Dashboard</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">
                                {{
                                    'Happy': '😊',
                                    'Calm': '🌿',
                                    'Neutral': '😐',
                                    'Anxious': '😟',
                                    'Sad': '😔'
                                }[journal.mood] || '📝'}
                            </span>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{journal.title || 'Journal Entry'}</h1>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(journal.createdAt).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {/* Edit not implemented yet for detail view, redirect to journal page? */}
                            <button
                                onClick={handleDelete}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap break-words">
                            {journal.content}
                        </p>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default JournalDetail;
