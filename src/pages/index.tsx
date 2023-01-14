import React from 'react';
import Header from '../components/header/Header'
import styles from '../styles/Home.module.css'
import Paper from '@mui/material/Paper';
import Switch from '../components/Switch';
import { P } from '../components/BasicComponents';
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
          <Paper>
            <P>Deezert</P>
            <Switch />
          </Paper>
      </main>
    </>
  );
}
