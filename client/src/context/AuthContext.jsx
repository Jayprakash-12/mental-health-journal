import { createContext, useState, useEffect, useContext } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user info on initial load
        // In a real production app with httpOnly cookies, we might hit an endpoint /me here
        // For this simple MVP, we will rely on persistent state management or simple local storage for "isLoggedIn" UI state
        // but the real auth token is in the cookie.

        // To make this robust, we should have a /api/auth/me endpoint.
        // Let's assume for now we persist the user object to localStorage on login
        // just for UI hydration.
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const data = await loginApi(userData);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    const register = async (userData) => {
        const data = await registerApi(userData);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    };

    const logout = async () => {
        await logoutApi();
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
