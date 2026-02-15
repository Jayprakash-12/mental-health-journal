import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getJournals, deleteJournal, createJournal, updateJournal } from '../services/journalService';
import Layout from '../components/Layout';
import JournalForm from '../components/journal/JournalForm';
import JournalCard from '../components/journal/JournalCard';

const JournalPage = () => {
    const [journals, setJournals] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    // State to hold data for the form. 
    // When editing, this will be populated with the journal entry.
    // When creating, it can be reset.
    const [formData, setFormData] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        loadJournals();

        // Check for ?new=true query param
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('new') === 'true') {
            setIsCreating(true);
            setFormData(null); // Ensure fresh form
        }
    }, [location]);

    const loadJournals = async () => {
        try {
            const data = await getJournals();
            setJournals(data);
        } catch (error) {
            console.error('Failed to load journals', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (entryData) => {
        if (!entryData.content || !entryData.mood) return;

        try {
            if (editingId) {
                const updated = await updateJournal(editingId, entryData);
                setJournals(journals.map(j => j._id === editingId ? updated : j));
            } else {
                const created = await createJournal(entryData);
                setJournals([created, ...journals]);
            }
            handleClose();
        } catch (error) {
            console.error('Failed to save journal', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteJournal(id);
            setJournals(journals.filter(j => j._id !== id));
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    const handleEdit = (journal) => {
        setFormData({
            content: journal.content,
            mood: journal.mood,
            tags: journal.tags || []
        });
        setEditingId(journal._id);
        setIsCreating(true);
    };

    const handleClose = () => {
        setIsCreating(false);
        setEditingId(null);
        setFormData(null);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">My Journal</h2>
                        <p className="text-slate-500">Reflect on your journey</p>
                    </div>
                    <button
                        onClick={() => {
                            setFormData(null);
                            setEditingId(null);
                            setIsCreating(true);
                        }}
                        className="bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-700 transition-all font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        New Entry
                    </button>
                </header>

                <JournalForm
                    isOpen={isCreating}
                    onClose={handleClose}
                    isEditing={!!editingId} // Convert to boolean
                    initialData={formData}
                    onSubmit={handleCreateOrUpdate}
                />

                {/* Journal List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-slate-400 text-center py-10">Loading entries...</div>
                    ) : journals.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-400">No entries yet. Start writing today.</p>
                        </div>
                    ) : (
                        journals.map((journal) => {
                            // Don't show the entry in the list if it's currently being edited
                            // Logic: do we want to hide it? Previously yes.
                            if (journal._id === editingId) return null;

                            return (
                                <JournalCard
                                    key={journal._id}
                                    journal={journal}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onClick={() => navigate(`/journal/${journal._id}`)}
                                />
                            );
                        })
                    )}
                </div>
            </div >
        </Layout >
    );
};

export default JournalPage;
