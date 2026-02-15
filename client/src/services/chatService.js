import api from './api';

export const sendMessage = async (messages) => {
    const response = await api.post('/chat', { messages });
    return response.data;
};
