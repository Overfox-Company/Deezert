import React from 'react';
import Header from '../components/header/Header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@mui/material';
import {ThemeLight, ThemeDark} from '../theme/Theme';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CONTAINER_DARK } from '../constants/Color';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppProvider , AppContext} from '../context/AppContext';
export default function Home() {
  const { darkMode } = React.useContext(AppContext)
  let theme =darkMode ?ThemeDark:ThemeLight
  return (
    <>
      <ThemeProvider theme={darkMode ?ThemeDark:ThemeLight}>
        <Header/>
      <main className={styles.main}>
          <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography>
           Deezert
          </Typography>
          </div>
        </main>
      </ThemeProvider>
      </>
  )
}
