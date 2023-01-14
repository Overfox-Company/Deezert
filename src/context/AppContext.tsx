import React, { createContext, useState } from 'react';
import { ProviderProps } from '../types/app';
import { ContextData } from '../types/app';
export const AppContext = createContext<ContextData>({
    darkMode: false,
    setDarkMode: () => {}
});
export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <AppContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </AppContext.Provider>
    );
};

