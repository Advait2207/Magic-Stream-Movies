import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');

            if (!storedUser) return null;
       
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            return null;
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('user', JSON.stringify(auth));
        } else {
            localStorage.removeItem('user');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;