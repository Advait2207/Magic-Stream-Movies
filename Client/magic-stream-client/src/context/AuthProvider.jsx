import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) return null;

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            return null;
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
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;