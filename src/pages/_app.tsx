import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppRouter from "./App";
import { Wrapper } from "../components/BasicComponents";
import React from "react";
import ThemeContainer from "../components/theme/ThemeComponent";
export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <AppRouter>
      <ThemeContainer>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeContainer>
    </AppRouter>
  );
}
