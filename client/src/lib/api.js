import axios from 'axios';

// API base URL configuration
// - Development: Use localhost:5001 directly
// - Production: Use environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized - please login again');
        }
        return Promise.reject(error);
    }
);

export default api;
