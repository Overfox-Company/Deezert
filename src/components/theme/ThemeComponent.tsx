import React from 'react';
import { ProviderProps } from '../../types/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeLight, ThemeDark } from '../../theme/Theme';
import { AppContext } from '../../context/AppContext';
const ThemeContainer: React.FC<ProviderProps> = ({ children }) => {
    const {darkMode}=React.useContext(AppContext)
    return (
        <ThemeProvider theme={darkMode ? ThemeDark : ThemeLight}>
                {children}
        </ThemeProvider>
    )
}
export default ThemeContainer;