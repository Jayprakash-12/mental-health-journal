import api from './api';

export const getJournals = async () => {
    const response = await api.get('/journal');
    return response.data;
};

export const getJournal = async (id) => {
    const response = await api.get(`/journal/${id}`);
    return response.data;
};

export const createJournal = async (journalData) => {
    const response = await api.post('/journal', journalData);
    return response.data;
};

export const updateJournal = async (id, journalData) => {
    const response = await api.put(`/journal/${id}`, journalData);
    return response.data;
};

export const deleteJournal = async (id) => {
    const response = await api.delete(`/journal/${id}`);
    return response.data;
};
