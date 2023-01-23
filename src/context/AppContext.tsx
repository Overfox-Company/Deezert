import React, { createContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
const InitialUser = {
    
                name: '',
                user: '',
                lastName:  '',
                password:  '',
                avatar:  '',
                email:  '',
                id:  '',
                manager: false,
                session: '',
                phone: '',
                country: '',
                client: false,
                BackgroundImage: '',
                rank: '',
                speciality: '',
                Subscription: {},
                income:'',
                joinDate:  '',
                verified: false,
                methodRegister:  ''
}
export const AppContext = createContext<ContextData>({
    user:InitialUser,
    setUser: () => { },
    darkMode: false,
    setDarkMode: () => { },
    token:'',
    setToken: ()=>{ },
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [token,setToken]=useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(InitialUser);
    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AppContext.Provider value={{user, setUser, darkMode, setDarkMode,token,setToken, isAuthenticated, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};