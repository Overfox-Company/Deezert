import React from 'react';
import { Switch } from '@mui/material';
import { AppContext } from '../context/AppContext';
const SwitchDarkMode = () => {
    const {darkMode,setDarkMode}=React.useContext(AppContext)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
};
    return (
        <Switch checked={darkMode} onChange={handleChange} color="primary" />
    )
}
export default SwitchDarkMode;