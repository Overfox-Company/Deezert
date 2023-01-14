import React from 'react';
import { ProviderProps } from '../types/app';
import { Paper,Typography } from '@mui/material';
export const Div: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Paper>
            {children}
       </Paper> 
    )
}
export const P: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Typography variant="h1"   gutterBottom>
            {children}
        </Typography>
    )
}