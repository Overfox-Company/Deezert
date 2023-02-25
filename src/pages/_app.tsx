/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppRouter from "./App";
import { Wrapper } from "../components/BasicComponents";
import React from "react";
import styles from "../styles/Home.module.css";
import ThemeContainer from "../components/theme/ThemeComponent";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Header from "../components/header/Header";
import Loader from "../components/Loader";
import SnackbarCustom from "../components/Snackbar";
const publicRoutes: string[] = ["index", "login", "invitation"];


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouter>
      <ThemeContainer>
        <Wrapper className={styles.main}>
          <Loader />
          <SnackbarCustom />
          {publicRoutes.includes(Component.name) ? (
            <>
             {Component.name!=='invitation'&& <Header />}
              <Component {...pageProps} />
            </>
          ) : (
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          )}
        </Wrapper>
      </ThemeContainer>
    </AppRouter>
  );
}
