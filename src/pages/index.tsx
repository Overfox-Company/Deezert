import React from "react";
import Header from "../components/header/Header";
import styles from "../styles/Home.module.css";
import Paper from "@mui/material/Paper";
import Switch from "../components/Switch";
import { P } from "../components/BasicComponents";
import GoogleLoginButotn from "../hooks/google/Google";
import { AppContext } from "../context/AppContext";
import Button from "@mui/material/Button";
import { ConnectServer } from "../functions/app/ApiFunctions";
export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>

      </main>
    </>
  );
}
