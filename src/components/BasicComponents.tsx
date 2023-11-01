import React from 'react';
import { ProviderProps } from '../types/app';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material';
import styled from '@emotion/styled';
const CustomTypography = styled(Typography)({
    fontFamily: 'Comfortaa, cursive',
    textAlign: 'center',
    fontSize: '2.5vh'
});
export const Div: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Paper>
            {children}
        </Paper>
    )
};
type PTypes = {
    children: React.ReactNode;
    style?: any;
}
export const P: React.FC<PTypes> = ({ children, style }) => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <CustomTypography style={style} color={theme.palette.mode === 'dark' ? 'white' : 'textPrimary'} gutterBottom>
                {children}
            </CustomTypography>
        </ThemeProvider>
    )
};
export const Wrapper: React.FC<ProviderProps> = ({ children, className }) => {
    return (
        <Box className={className} sx={{ bgcolor: 'background.default', }}>
            {children}
        </Box >
    )
}