/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppRouter from "./App";
import { Wrapper } from "../components/BasicComponents";
import React from "react";
import styles from "../styles/Home.module.css";
import ThemeContainer from "../components/theme/ThemeComponent";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Link from "next/link";
import Header from "../components/header/Header";
import Head from "next/head";
import Loader from "../components/Loader";
const publicRoutes: string[] = ['index', 'login']

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouter>
      <ThemeContainer>
        <Wrapper className={styles.main}>
           <Loader/>
          {publicRoutes.includes(Component.name) ? 
            <>
              <Header/>
                          <Component {...pageProps} />
            </>

            :
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          }
        </Wrapper>
      </ThemeContainer>
    </AppRouter>
  );
}