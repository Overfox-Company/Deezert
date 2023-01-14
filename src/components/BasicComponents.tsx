import React from 'react';
import { ProviderProps } from '../types/app';
import { Paper,Typography,Box } from '@mui/material';
export const Div: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Paper>
            {children}
        </Paper>
    )
};
export const P: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Typography gutterBottom>
            {children}
        </Typography>
    )
};
export const Wrapper: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Box sx={{ bgcolor: 'background.default',}}>
            {children}
        </Box >
    )
}