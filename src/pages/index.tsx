import React from 'react';
import Header from '../components/header/Header'
import styles from '../styles/Home.module.css'
import { ThemeProvider } from '@mui/material';
import {ThemeLight, ThemeDark} from '../theme/Theme';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppContext } from '../context/AppContext';
import Switch from '../components/Switch';
import { P } from '../components/BasicComponents';
export default function Home() {
  const { darkMode } = React.useContext(AppContext)
  return (
    <>
      <ThemeProvider theme={darkMode ?ThemeDark:ThemeLight}>
        <Header/>
      <main className={styles.main}>
          <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper>
           <P>
           Deezert
            </P>
            <Switch/>
            </Paper> 
          </div>
        </main>
      </ThemeProvider>
      </>
  )
}
