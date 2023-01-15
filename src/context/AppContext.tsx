import React, { createContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
export const AppContext = createContext<ContextData>({
    darkMode: false,
    setDarkMode: () => { },
    token:'',
    setToken: ()=>{ }
});
export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [token,setToken]=useState('')
    return (
        <AppContext.Provider value={{ darkMode, setDarkMode,token,setToken }}>
            {children}
        </AppContext.Provider>
    );
};

