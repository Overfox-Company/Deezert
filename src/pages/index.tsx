import React from "react";
import Header from "../components/header/Header";
import styles from "../styles/Home.module.css";
import Login from "../Views/login/Login";
export default function Home() {
  return (
    <>

      <main className={styles.main}>
        <Header />
        <Login />
      </main>
    </>
  );
}
