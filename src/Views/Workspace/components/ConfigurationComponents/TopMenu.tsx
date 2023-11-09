import React, { FC } from 'react'
import { Container, Item } from '../../../../components/Container'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
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