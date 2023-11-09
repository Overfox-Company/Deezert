import React, { FC } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
interface TabPanelProps {
    setValue: React.Dispatch<React.SetStateAction<number>>;
    value: number;
}

const TopMenu: FC<TabPanelProps> = ({ value, setValue }) => {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Configurar Equipo" />
            </Tabs>

        </Box>)
}
export default TopMenu;